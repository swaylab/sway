# Sway

## What is Sway

Sway is a Web3-based collective buying platform that gives consumers the purchasing power they've never had as individuals. Think of it like this: you walk into a store alone and pay $1000 for an iPhone — the seller has no reason to budge on price. But what if 100 people showed up together, cash in hand, guaranteed to buy? Suddenly, the seller is the one who wants to negotiate.

That's exactly what Sway enables. Users pool their demand for products, sellers compete for guaranteed bulk sales, and everyone wins — buyers pay less, sellers move inventory without risk or overhead.

The platform is built on blockchain and smart contracts to ensure trust, transparency, and security throughout the entire process. Funds are locked in smart contracts and only released when the deal is complete — no middlemen, no surprises.

### How It Works

1. **Pool Creation** — A user selects a product (e.g., iPhone 16 Pro Max), sets a minimum participant count, and opens a pool.
2. **Participation** — Other users join the pool and deposit funds into the smart contract.
3. **Offer Stage** — Once the target is reached, sellers are invited to compete by offering their best prices.
4. **Competitive Bidding** — Sellers or manufacturers submit bids for one week.
5. **Selection & Delivery** — The best offer is chosen, products are shipped, and sellers receive the pooled funds.

---

For every feature or page, write a detailed description explaining the whole flow in plain language.

Explain the technical architecture, how components connect, why certain decisions were made, and what lessons can be drawn. Include bugs encountered, how they were fixed, potential pitfalls, new technologies used, and best practices observed.

Make it engaging — use analogies and anecdotes where appropriate. Avoid dry documentation.

---

## Development Guidelines

## General

Follow these rules strictly when generating code or solutions:

- Do not over-engineer.
- Do not add unnecessary abstractions or complexity.
- Keep solutions simple, minimal, and direct.
- Do not introduce extra props, parameters, layers, or patterns unless they are truly needed.
- Prefer local, self-contained logic whenever possible.

Most importantly:

- If you are not 100% certain about any requirement or implementation detail, STOP and ask questions first.
- Do not assume.
- Do not guess.
- Do not invent behavior.
- Do not "fill in the gaps" yourself.
- Clarify all uncertainties before writing code.
- Only proceed when the requirements are completely clear.

## Avoid Unnecessary Prop Drilling and Over-Engineering

When writing React components, avoid unnecessary prop drilling and over-engineering.
If a function is only used inside a component, define it inside that component. Do NOT pass it from the parent as a prop unless the parent actually needs to control or customize that behavior.

Bad example (unnecessary prop):

```tsx
const navigateToPage = () => {}
<Comp onNavigate={navigateToPage} />
```

Good example (keep logic local):

```tsx
function Comp() {
  const navigateToPage = () => {}
}
```

Only use props when:
- the parent must control the behavior
- the behavior is configurable/reusable
- the logic is shared

Otherwise, keep functions local to the component.

## Typing

All type definitions are located under the **@/types** folder.

**Rules:**

- Do NOT use `import` syntax for type definitions
- Type files use the `.d.ts` extension: `[FILE_NAME].d.ts`
- Types are globally available without explicit imports

```
@/types/
    ├── pool.d.ts
    ├── bid.d.ts
    ├── product.d.ts
    └── user.d.ts
```

## React Query Usage

Use React Query for all API requests.

**Mandatory Requirements:**

- Always destructure `data`, `isLoading`, and `isError` from query results
- Handle all three states in every component
- Never use only `data` without handling loading and error states

```tsx
const { data, isLoading, isError } = useQuery({
  queryKey: ['pools'],
  queryFn: fetchPools
});

if (isLoading) return <LoadingSpinner />;
if (isError) return <ErrorMessage />;
return <PoolList data={data} />;
```

## Component Structure

Each section must be a separate component and imported into the relevant file.

**Rules:**

- Break pages into logical sections
- Each section = separate component file
- Import sections into the main page/parent component

**Example Structure:**

```
app/
  ├── pools/
  │   └── page.tsx
components/
  ├── PoolCard.tsx
  ├── PoolList.tsx
  └── BidSection.tsx
```

- **CRITICAL: NEVER define components inside other components**

❌ NEVER DO THIS:

```tsx
const A = () => {
  const B = () => {
    return <div>Inner</div>;
  };
  return <div><B /></div>;
};
```

✅ DO THIS INSTEAD:

```tsx
// components/B.tsx
export default function B() {
  return <div>Inner</div>;
}

// components/A.tsx
import B from './B';
export default function A() {
  return <div><B /></div>;
}
```

Why this matters:
- Nested components recreate on every render (performance issue)
- Breaks React DevTools
- Loses component state on re-renders

## Prop Definitions

**NEVER** destructure object properties when passing props. Pass the entire object.

❌ DON'T:

```tsx
<Component a={object.a} b={object.b} c={object.c} />
```

✅ DO:

```tsx
<Component data={object} />
```

## Conditional UI States

Do not use inline JSX for conditional UI states like loading, error, or empty.

❌ Avoid:

```tsx
{isError && <ErrorComponent />}
{isLoading && <LoadingComponent />}
{!isLoading && !isError && <Content />}
```

✅ Prefer:

```tsx
if (isError) return <ErrorComponent />;
if (isLoading) return <LoadingComponent />;
return <Content />;
```

## Marketing Scripts

Use the `<ProductionOnly>` component to wrap marketing/analytics scripts. This ensures they only run in production, not during development.

```tsx
import ProductionOnly from '@/components/ProductionOnly';

export default function Layout() {
  return (
    <>
      <ProductionOnly>
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
      </ProductionOnly>
      <main>{children}</main>
    </>
  );
}
```

## User Interface

- Prefer **shadcn/ui** components when building UI.
- If a required component doesn't exist in the current shadcn/ui setup, install the necessary shadcn component instead of building custom UI from scratch.
- Only create custom UI components when shadcn/ui cannot reasonably cover the use case.

## Web3 & Smart Contracts

- All blockchain interactions must go through a dedicated hook (e.g., `usePool`, `useBid`).
- Never call contract methods directly from UI components.
- Handle wallet connection state explicitly — always account for disconnected, connecting, and connected states.
- Smart contract addresses and ABIs live in `@/lib/contracts/`.
- Use environment variables for contract addresses; never hardcode them.

## Package Installation

When installing a new package, note the reason:

```
Command: npm install package-name
Why: Required for [specific functionality]
```
