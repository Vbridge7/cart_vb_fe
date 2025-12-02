import BannerBlock from 'components/blocks/BannerBlock';
import FooterColumnBlock from 'components/blocks/FooterColumnBlock';
import NavigationLinksBlock from 'components/blocks/NavigationLinksBlock';
import PrimaryNavigationBannerBlock from 'components/blocks/PrimaryNavigationBannerBlock';
import PrimaryNavigationCategoriesBlock from 'components/blocks/PrimaryNavigationCategoriesBlock';
import PrimaryNavigationColumnBlock from 'components/blocks/PrimaryNavigationColumnBlock';
import PrimaryNavigationLinkBlock from 'components/blocks/PrimaryNavigationLinkBlock';
import ProductsAndBannerBlock from 'components/blocks/ProductsAndBannerBlock';
import ProductsBlock from 'components/blocks/ProductsBlock';
import React from 'react';
import 'server-only';
import { GLBrandBannerBlock } from '../components/blocks/GLBrandBannerBlock';
import { GLBrandListBlock } from '../components/blocks/GLBrandListBlock';
import { GLCarouselBannerBlock } from '../components/blocks/GLCarouselBannerBlock';
import { GLCategoryListingBlock } from '../components/blocks/GLCategoryListingBlock';
import { GLColumnBannerBlock } from '../components/blocks/GLColumnBannerBlock';
import { GLContactFormBlock } from '../components/blocks/GLContactFormBlock';
import { GLCustomerRegistrationBlock } from '../components/blocks/GLCustomerRegistrationBlock';
import { GLEditorBlock } from '../components/blocks/GLEditorBlock';
import { GLEmptyBlock } from '../components/blocks/GLEmptyBlock';
import { GLFeaturedProductsBannerBlock } from '../components/blocks/GLFeaturedProductsBannerBlock';
import { GLFullWidthBannerBlock } from '../components/blocks/GLFullWidthBannerBlock';
import { GLGridBanner } from '../components/blocks/GLGridBannerBlock';
import { GLHeroBanner } from '../components/blocks/GLHeroBannerBlock';
import { GLLinkListingBlock } from '../components/blocks/GLLinkListingBlock';
import { GLMonoBanner } from '../components/blocks/GLMonoBannerBlock';
import { GLProductCategoryBlock } from '../components/blocks/GLProductCategoryBlock';
import { GLProductListingBlock } from '../components/blocks/GLProductListingBlock';
import { GLRequestQuoteBlock } from '../components/blocks/GLRequestQuoteBlock';
import { GLTestimonialsBlock } from '../components/blocks/GLTestimonialsBlock';
import { GLTextBlock } from '../components/blocks/GLTextBlock';

/**
 * Gets a Block component by its type.
 * @param typename Component's type name, for example: BannerBlock.
 * @returns a Block component.
 */
export function getComponent(typename: string): (props: any) => React.JSX.Element | Promise<React.JSX.Element> {
  return Components[typename];
}

const Components: {
  [typename: string]: (props: any) => React.JSX.Element | Promise<React.JSX.Element>;
} = {
  BannerBlock,
  FooterColumnBlock,
  GLBrandBannerBlock,
  GLBrandListBlock,
  GLCarouselBannerBlock,
  GLCategoryListingBlock,
  GLColumnBannerBlock,
  GLContactFormBlock,
  GLCustomerRegistrationBlock,
  GLEditorBlock,
  GLEmptyBlock,
  GLFeaturedProductsBannerBlock,
  GLFullWidthBannerBlock,
  GLGridBanner,
  GLHeroBanner,
  GLLinkListingBlock,
  GLMonoBanner,
  GLProductCategoryBlock,
  GLProductListingBlock,
  GLRequestQuoteBlock,
  GLTestimonialsBlock,
  GLTextBlock,
  NavigationLinksBlock,
  PrimaryNavigationBannerBlock,
  PrimaryNavigationCategoriesBlock,
  PrimaryNavigationColumnBlock,
  PrimaryNavigationLinkBlock,
  ProductsAndBannerBlock,
  ProductsBlock,
};
