import { cn } from '@/lib/utils';
import Image from 'next/image';
import { BsFiletypePdf } from 'react-icons/bs';

const TabItem = ({
  name,
  value,
  className,
  isFile,
  altText,
}: {
  name: string | React.ReactNode;
  value?: string | string[];
  className?: string;
  isFile?: boolean;
  altText?: string;
}) => {
  if (!value || !value.length) return;

  // check if value is a pdf
  const isPdf = !Array.isArray(value) && isFile && value.endsWith('.pdf');

  return (
    <div className={cn(className)}>
      {/* label */}
      <h3 className="preview_label">
        {name}
        {isFile && typeof value === 'string' && (
          <a
            href={value}
            className="ml-4 inline-block text-xs underline underline-offset-1 text-shadow-blue-900"
          >
            Download file
          </a>
        )}
      </h3>

      {/* display value */}
      {Array.isArray(value) ? (
        // when value is an array
        <ul className="list-disc space-y-1 ps-5">
          {value.map((item, index) => (
            <li key={`${name}_${item}_${index}`} className="preview_data">
              {item}
            </li>
          ))}
        </ul>
      ) : isFile ? (
        isPdf ? (
          // when value is a pdf
          <p className="preview_data mt-1.5 mb-2 flex items-center gap-2">
            <BsFiletypePdf className="size-5 shrink-0" />
            PDF cannot be displayed. Download it instead
          </p>
        ) : (
          // when value is an image
          <div className="mb-2 h-40 w-full rounded-md border p-1">
            <Image
              className="size-full object-contain"
              src={value}
              alt={altText ?? String(name)}
              width={320}
              height={240}
            />
          </div>
        )
      ) : (
        // when value is a string
        <p className="preview_data">{value}</p>
      )}
    </div>
  );
};

export default TabItem;
