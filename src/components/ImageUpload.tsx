import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadProductImage, compressImage } from "@/lib/image-upload";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
  onImageUpload: (urls: string[]) => void;
  onImageRemove?: (url: string) => void;
  maxImages?: number;
  uploadedImages?: string[];
  isLoading?: boolean;
}

export function ImageUpload({
  onImageUpload,
  onImageRemove,
  maxImages = 10,
  uploadedImages = [],
  isLoading = false,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // local state to avoid stale props when parent updates asynchronously
  const [images, setImages] = useState<string[]>(uploadedImages);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUploadFiles = async (files: FileList) => {
    if (!files) return;

    setError(null);

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    setUploadingImages((prev) => [...prev, ...filesToUpload.map((f) => f.name)]);

    try {
      for (const file of filesToUpload) {
        try {
          const compressedFile = await compressImage(file, 0.85);
          console.debug("Uploading image:", file.name);
          const url = await uploadProductImage(compressedFile);

          if (url) {
            const newImages = [...images, url];
            setImages(newImages);
            onImageUpload(newImages);
          }
        } catch (innerErr) {
          console.error("Error uploading file:", file.name, innerErr);
          throw innerErr;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      console.error("Upload error:", err);
    } finally {
      setUploadingImages([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleUploadFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUploadFiles(e.target.files);
    }
  };

  const handleRemoveImage = (url: string) => {
    const newImages = images.filter((img) => img !== url);
    setImages(newImages);
    onImageRemove?.(url);
    onImageUpload(newImages);
  };

  const reorderImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    setImages(newImages);
    onImageUpload(newImages);
  };

  // sync prop changes into local state
  useEffect(() => {
    setImages(uploadedImages);
  }, [uploadedImages]);

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold">Product Images</div>

      {/* Upload Area */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          backgroundColor: isDragging ? "rgb(240, 240, 240)" : "transparent",
          borderColor: isDragging ? "rgb(255, 193, 7)" : "rgb(200, 200, 200)",
        }}
        className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition cursor-pointer hover:border-yellow-500 hover:bg-gray-50"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isLoading || uploadingImages.length > 0}
        />

        <div className="flex flex-col items-center gap-3">
          {uploadingImages.length > 0 ? (
            <>
              <Loader2 className="h-12 w-12 text-accent animate-spin" />
              <div>
                <div className="font-semibold">Uploading images...</div>
                <div className="text-sm text-muted-foreground">
                  {uploadingImages.length} file(s) uploading
                </div>
              </div>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400" />
              <div>
                <div className="font-semibold">Drag & drop images here</div>
                <div className="text-sm text-gray-500">or click to browse</div>
              </div>
              <div className="text-xs text-gray-400">
                Max {maxImages} images, JPEG/PNG/WebP up to 10MB each
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200"
        >
          {error}
        </motion.div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          <div className="text-sm text-gray-600">
            {images.length} image{images.length !== 1 ? "s" : ""} uploaded
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <AnimatePresence mode="popLayout">
              {images.map((imageUrl, index) => (
                <motion.div
                  key={imageUrl}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group relative rounded-lg overflow-hidden bg-gray-100 aspect-square"
                >
                  <img src={imageUrl} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />

                  {/* Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                      Main
                    </div>
                  )}

                  {/* Remove Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    onClick={() => handleRemoveImage(imageUrl)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>

                  {/* Order Number */}
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded">#{index + 1}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {images.length === 0 && uploadingImages.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}
