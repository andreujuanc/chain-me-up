import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { useBundlr } from '../../bundlr.context';

export function UploadImage(): ReactElement {
  const { uploadFile } = useBundlr();
  const [URI, setURI] = useState('');
  const [file, setFile] = useState<Buffer>();
  const [image, setImage] = useState('');
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files ?? [];

    if (fileList.length > 0) {
      const file = fileList[0];
      const image = URL.createObjectURL(file);

      setImage(image);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFile(Buffer.from(reader.result as ArrayBuffer));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  function handleClick() {
    hiddenFileInput.current?.click();
  }

  async function handleUpload() {
    if (file) {
      const response = await uploadFile(file);
      setURI(`http://arweave.net/${response.data.id}`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-20">
      <button onClick={handleClick} className="mb-4">
        {image ? 'Change Selection' : 'Select Image'}
        <input
          accept="image/png, image/gif, image/jpeg"
          type="file"
          ref={hiddenFileInput}
          onChange={onFileChange}
          className="hidden"
        />
        {image && (
          <div>
            <button
              className="px-8 py-2 text-black bg-gray-200 rounded hover:bg-gray-100"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        )}
        {URI && (
          <p className="mt-4">
            <span className="text-xl">Uploaded File:</span>{' '}
            <a href={URI} target="_blank" rel="noreferrer">
              {URI}
            </a>
          </p>
        )}
      </button>
    </div>
  );
}
