import css from './productInfo.module.scss';
import type { IInfo, IProduct } from '@/models/products';
import type { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '../../productCarousel/ProductCarousel';
import ProductControls from '@/components/features/ProductControls/ProductControls';
import ProductRate from '../ProductRate/ProductRate';
import SendRate from '@/components/features/forms/ProductSendRate/SendRate';
import RateList from '../../rate/RateList/RateList';

interface IProps {
  // productId: string;
  product: IProduct;
  infoGuard: boolean;
  thumbnailsGuard: boolean;
  gallery: string[];
}

export default function ProductInfo({
  product,
  gallery,
  infoGuard,
  thumbnailsGuard,
}: IProps) {
  const OPTIONS: EmblaOptionsType = {};
  return (
    <div className={css.productContainer}>
      <div className={css.productMain}>
        <div className={css.productMedia}>
          <EmblaCarousel
            slides={gallery}
            options={OPTIONS}
          />
        </div>
        <div className={css.productColumn}>
          <h1 className={css.productTitle}>{product.title}</h1>
          <p className={css.productDescription}>{product.description}</p>
          <div className={css.productInfo}>
            <ProductRate
              mediumRate={product.rating.mediumRate}
              rates={product.rating.rates}
            />
            <p className={css.productPrice}>
              <span className={css.productInfoLabel}>Price:</span>
              {product.price}
              <span>MDL</span>
            </p>
            <p className={css.productCount}>
              <span className={css.productInfoLabel}>In stock:</span>
              {product.cnt}
              <span>pcs.</span>
            </p>
          </div>
          <div className={css.productControlsContainer}>
            <ProductControls product={product} />
          </div>
        </div>
      </div>
      {infoGuard ? (
        <div className={css.productSecond}>
          <h2 className={css.productCharTitle}>Characteristics</h2>
          <div className={css.productCharacteristics}>
            {product.info.map((information: IInfo) => (
              <div
                key={information._id}
                className={css.productCharacteristic}
              >
                <h2 className={css.productInfoTitle}>{information.title}</h2>
                <p className={css.productInfoText}>{information.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={css.productCharTitle}>No characteristics</div>
      )}
      <SendRate productId={product._id} />
      <RateList />
    </div>
  );
}
