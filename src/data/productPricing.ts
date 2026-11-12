export type ProductPlanId = 'access';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd?: number;
  priceNote: string;
}

/** Single checkout CTA — durations live on the checkout partner. */
const accessPlan: ProductPlan = {
  id: 'access',
  label: 'Get access',
  priceNote: 'Secure checkout · instant key delivery',
};

/**
 * Optional starting USD prices for Product JSON-LD Offers.
 * Set only when the value matches live checkout; leave undefined to skip Offer
 * (FAQ rich results still apply — invalid priceless Offers do not).
 */
/** Starting USD from live monthly plans (verified 2026-11-11). */
const fromPriceUsdBySlug: Record<string, number | undefined> = {
  lite: 35,
  pro: 35,
  elite: 35,
  'hwid-spoofer': 35,
  ugc: 35,
  'unlock-all': 35,
};

export function getProductPlans(_productSlug: string): ProductPlan[] {
  return [accessPlan];
}

export function getProductFromPriceUsd(productSlug: string): number | undefined {
  return fromPriceUsdBySlug[productSlug];
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, _planId?: ProductPlanId): string {
  return baseUrl;
}
