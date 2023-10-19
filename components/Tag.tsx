/* eslint-disable react/destructuring-assignment */
import numeral from 'numeral';
import { FunctionComponent, useMemo, useState } from 'react';

import styles from '../styles/Tag.module.css';

export interface TagProps {
  title: string;
  brand: string;
  description: string;
  size: string;
  price: string;
  save: string;
  endDate: string;
  ean_code: string;
}

const Tag: FunctionComponent<TagProps> = ({
  title,
  brand: defaultBrand,
  description: defaultDescription,
  size: defaultSize,
  price,
  save,
  endDate,
  ean_code: eanCode,
}) => {
  const [brand, setBrand] = useState<string>(defaultBrand.trim());
  const [description, setDescription] = useState<string>(
    defaultDescription.trim(),
  );
  const [size, setSize] = useState<string>(defaultSize.trim());

  const brandError = useMemo(() => brand.length > 20, [brand]);
  const descriptionError = useMemo(
    () => description.length > 20,
    [description],
  );
  const sizeError = useMemo(() => size.length > 21, [size]);

  const formattedEndDate = useMemo(
    () =>
      new Date(endDate).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
      }),
    [endDate],
  );

  return (
    <div
      className={
        brandError || descriptionError || sizeError
          ? styles.tagError
          : styles.tag
      }
    >
      <span className={title === 'Clearance' ? styles.showTitle : styles.title}>
        {title}
      </span>
      <span className={brandError ? styles.brandError : styles.brand}>
        <input
          className={styles.input}
          onChange={(e) => setBrand(e.currentTarget.value)}
          value={brand}
        />
      </span>
      <span
        className={
          descriptionError ? styles.descriptionError : styles.description
        }
      >
        <input
          className={styles.input}
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
        />
      </span>
      <span className={sizeError ? styles.sizeError : styles.size}>
        <input
          className={styles.input}
          onChange={(e) => setSize(e.currentTarget.value)}
          value={size}
        />
      </span>
      <span className={styles.price}>{numeral(price).format('$0.00')}</span>
      <span className={styles.save}>
        Save {save} <span className={styles.saveSubtext}>off RRP</span>
      </span>
      <span className={styles.endDate}>
        Sale ends <span>{formattedEndDate}</span>
      </span>
      <span className={styles.ean_code}>{eanCode}</span>
    </div>
  );
};

export default Tag;
