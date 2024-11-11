import React, { useCallback, useRef, useState } from 'react';
import { Upload, Link, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  aspectRatio?: 'square' | 'video';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  className = '',
  aspectRatio = 'square'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically upload the file to your storage service
    // For demo purposes, we'll create a data URL
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
      alert('Error al subir la imagen. Por favor, intenta de nuevo.');
    }
  }, [onChange]);

  const handleUrlSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!urlInput) return;

    try {
      new URL(urlInput);
      onChange(urlInput);
      setShowUrlInput(false);
      setUrlInput('');
    } catch {
      alert('Por favor ingresa una URL válida');
    }
  }, [urlInput, onChange]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  }, [onChange]);

  if (showUrlInput) {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
          />
          <button
            type="button"
            onClick={() => handleUrlSubmit()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Agregar
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Ingresa la URL de una imagen pública
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        className={`relative border-2 border-dashed border-gray-300 rounded-lg ${
          aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'
        }`}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 mb-2 animate-spin" />
                <span className="text-sm">Subiendo imagen...</span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-sm">Arrastra una imagen o selecciona una opción</span>
              </>
            )}
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {!value && !isUploading && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            Subir archivo
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Link className="w-4 h-4" />
            Usar URL
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;