
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock3,
  Factory,
  Heart,
  Layers3,
  PackageCheck,
  Search,
  ShieldCheck,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

const categories = [
  "All Apparel",
  "Caps",
  "T-Shirts",
  "Polo Shirts",
  "Hoodies",
  "Jackets",
  "Workwear",
];

const categoryData = [
  {
    name: "Caps",
    eyebrow: "01 / Headwear",
    description: "Structured caps, snapbacks and embroidered headwear.",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85",
    count: "Headwear collection",
  },
  {
    name: "T-Shirts",
    eyebrow: "02 / Everyday",
    description: "Premium tees for teams, merchandise and growing brands.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    count: "Everyday essentials",
  },
  {
    name: "Polo Shirts",
    eyebrow: "03 / Corporate",
    description: "Smart polos for company uniforms and branded teams.",
    image:
      "https://images.unsplash.com/photo-1625910513413-5fc9f4b6e2d1?auto=format&fit=crop&w=900&q=85",
    count: "Business essentials",
  },
  {
    name: "Hoodies",
    eyebrow: "04 / Premium",
    description: "Comfort-focused fleece and heavyweight sweatshirts.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    count: "Elevated comfort",
  },
  {
    name: "Jackets",
    eyebrow: "05 / Outerwear",
    description: "Versatile outerwear for brands, staff and teams.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    count: "Outerwear collection",
  },
  {
    name: "Workwear",
    eyebrow: "06 / Professional",
    description: "Professional apparel for uniforms and company branding.",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
    count: "Uniform essentials",
  },
];

const products = [
  {
    id: 1,
    name: "Classic Structured Cap",
    category: "Caps",
    description: "A versatile cap ready for your embroidered logo.",
    price: 8,
    oldPrice: null,
    moq: 24,
    badge: "BESTSELLER",
    colors: ["#202020", "#e6dfd1", "#314b3d"],
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Premium Heavyweight Tee",
    category: "T-Shirts",
    description: "A substantial everyday tee for branded merchandise.",
    price: 12,
    oldPrice: null,
    moq: 24,
    badge: "POPULAR",
    colors: ["#202020", "#f0eee7", "#30465c"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Signature Corporate Polo",
    category: "Polo Shirts",
    description: "Smart, versatile apparel for professional teams.",
    price: 18,
    oldPrice: null,
    moq: 24,
    badge: "CORPORATE",
    colors: ["#192b42", "#f0eee8", "#252525"],
    image:
      "https://images.unsplash.com/photo-1625910513413-5fc9f4b6e2d1?auto=format&fit=crop&w=900&q=85",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Premium Fleece Hoodie",
    category: "Hoodies",
    description: "Comfortable fleece for teams and branded collections.",
    price: 25,
    oldPrice: null,
    moq: 24,
    badge: "PREMIUM",
    colors: ["#d0c8b9", "#242424", "#596b5b"],
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Everyday Corporate Jacket",
    category: "Jackets",
    description: "A refined outer layer for staff and company uniforms.",
    price: 35,
    oldPrice: null,
    moq: 24,
    badge: null,
    colors: ["#56604a", "#242424", "#c2b8a7"],
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Essential Team Workwear",
    category: "Workwear",
    description: "Practical uniform apparel for professional teams.",
    price: 16,
    oldPrice: null,
    moq: 24,
    badge: "TEAMWEAR",
    colors: ["#233c32", "#d8d4c9", "#292929"],
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Everyday Cotton Tee",
    category: "T-Shirts",
    description: "A clean, comfortable base for custom logo embroidery.",
    price: 10,
    oldPrice: null,
    moq: 50,
    badge: "VALUE PICK",
    colors: ["#eeece5", "#202020", "#a7b1bd"],
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Urban Zip Hoodie",
    category: "Hoodies",
    description: "A versatile zip-up layer for premium branded apparel.",
    price: 29,
    oldPrice: null,
    moq: 24,
    badge: null,
    colors: ["#343434", "#b7ad9e", "#243d32"],
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
    rating: 4.8,
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All Apparel");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [favorites, setFavorites] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Apparel" ||
        product.category === activeCategory;

      const term = search.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, search, sort]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function chooseCategory(category) {
    setActiveCategory(category);

    document
      .getElementById("bulk-products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function quoteLink(product) {
    const message = `Hello ZS Digitizing, I would like a bulk quote for ${product.name}. Please share pricing, customization options and delivery details.`;
    return `/contact?subject=${encodeURIComponent(
      `Bulk quote - ${product.name}`
    )}&message=${encodeURIComponent(message)}`;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f4] text-[#173326]">
      <div className="h-[152px] sm:h-[116px]" aria-hidden="true" />
      <Navbar />

      {/* HERO */}
      <section className="relative border-b border-[#0e2c1c]/10">
        <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-[#c9a76a]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12 lg:py-24">
          <div className="relative z-10">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#b58a4b]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#315c45]">
                ZS / Bulk Apparel & Embroidery
              </span>
            </div>

            <h1 className="max-w-2xl text-[clamp(43px,6.2vw,82px)] font-medium leading-[0.99] tracking-[-0.065em]">
              Apparel made
              <br />
              for your
              <br />
              <span className="font-serif italic text-[#8a6a3f]">
                brand to stand out.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-8 text-[#607666] sm:text-base">
              Premium blank apparel, professional embroidery and bulk
              customization for businesses, clothing brands, teams and
              growing organizations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("bulk-products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex min-h-12 items-center gap-5 bg-[#0e2c1c] px-6 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#244d36]"
              >
                Explore apparel
                <ArrowUpRight
                  size={16}
                  className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <Link
                href="/contact?subject=Bulk%20apparel%20quote"
                className="inline-flex min-h-12 items-center gap-3 border border-[#0e2c1c]/20 px-5 text-[10px] font-semibold uppercase tracking-[0.12em] transition hover:border-[#0e2c1c] hover:bg-white"
              >
                Request bulk quote
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 border-t border-[#0e2c1c]/15 pt-5">
              <div>
                <Layers3 size={19} className="text-[#9c7b47]" />
                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.08em]">
                  Bulk orders
                </p>
                <p className="mt-1 text-[10px] text-[#718477]">
                  Team quantities
                </p>
              </div>

              <div className="border-l border-[#0e2c1c]/10 pl-4">
                <Sparkles size={19} className="text-[#9c7b47]" />
                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.08em]">
                  Custom logos
                </p>
                <p className="mt-1 text-[10px] text-[#718477]">
                  Embroidery options
                </p>
              </div>

              <div className="border-l border-[#0e2c1c]/10 pl-4">
                <Factory size={19} className="text-[#9c7b47]" />
                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.08em]">
                  Business ready
                </p>
                <p className="mt-1 text-[10px] text-[#718477]">
                  Brand & uniform
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="absolute -left-3 top-8 z-10 hidden border border-[#c9a76a]/50 bg-[#f7f8f4] p-4 sm:block md:-left-7">
              <p className="text-[9px] uppercase tracking-[0.16em] text-[#718477]">
                Made for teams
              </p>
              <p className="mt-1 font-serif text-xl italic text-[#0e2c1c]">
                Your brand. Your way.
              </p>
            </div>

            <div className="relative aspect-[0.95/1] overflow-hidden bg-[#e6e9e0] sm:aspect-[1.12/1]">
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1500&q=90"
                alt="Premium apparel collection for custom branding"
                className="h-full w-full object-cover transition duration-700 hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2c1c]/85 via-[#0e2c1c]/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-9 sm:left-9 sm:right-9">
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#d8c29e]">
                  The wholesale collection
                </p>

                <h2 className="mt-3 max-w-md font-serif text-3xl italic sm:text-4xl">
                  From everyday essentials to branded uniforms.
                </h2>

                <button
                  type="button"
                  onClick={() => chooseCategory("All Apparel")}
                  className="mt-5 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-[10px] uppercase tracking-[0.14em] transition hover:border-[#c9a76a] hover:text-[#e5d1a9]"
                >
                  View collection
                  <ArrowDownRight size={16} />
                </button>
              </div>
            </div>

            <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.16em] text-[#718477]">
              <span>Apparel / Customization / Bulk</span>
              <span>ZS / 001</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-[#0e2c1c]/10 bg-white/60">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-5 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            {
              icon: PackageCheck,
              title: "Bulk-ready collections",
              detail: "Apparel for teams and businesses",
            },
            {
              icon: BadgeCheck,
              title: "Custom branding",
              detail: "Embroidery-led customization",
            },
            {
              icon: ShieldCheck,
              title: "Quote before ordering",
              detail: "Discuss your requirements first",
            },
            {
              icon: Truck,
              title: "Delivery coordination",
              detail: "Discuss timelines with our team",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-center gap-3">
                <Icon
                  size={21}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#9c7b47]"
                />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.07em]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[10px] text-[#718477]">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-[1440px] px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.23em] text-[#9c7b47]">
              Find your category
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-5xl">
              Apparel for every purpose.
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-6 text-[#718477]">
            Explore our product categories and find the right foundation for
            your next company order, team uniform or branded collection.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {categoryData.map((category) => (
            <button
              type="button"
              key={category.name}
              onClick={() => chooseCategory(category.name)}
              className={`group min-w-0 text-left ${
                activeCategory === category.name
                  ? "ring-1 ring-[#9c7b47] ring-offset-2"
                  : ""
              }`}
            >
              <div className="relative aspect-[0.78/1] overflow-hidden bg-[#e8ece5]">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2c1c]/90 via-[#0e2c1c]/5 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="text-[8px] uppercase tracking-[0.13em] text-[#d9c49e]">
                    {category.eyebrow}
                  </p>

                  <h3 className="mt-2 text-sm font-medium text-white sm:text-base">
                    {category.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[9px] text-white/65">
                      Explore range
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-white transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[10px] leading-5 text-[#718477]">
                {category.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT COLLECTION */}
      <section
        id="bulk-products"
        className="mx-auto max-w-[1440px] scroll-mt-28 px-5 pb-20 pt-14 sm:px-8 lg:px-12 lg:pt-20"
      >
        <div className="flex flex-col justify-between gap-6 border-b border-[#0e2c1c]/15 pb-7 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.23em] text-[#9c7b47]">
              Wholesale / Product catalogue
            </p>

            <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
              The apparel collection<span className="text-[#9c7b47]">.</span>
            </h2>

            <p className="mt-3 max-w-xl text-xs leading-6 text-[#718477] sm:text-sm">
              Find your products, explore customization possibilities and
              request a quote tailored to your order quantity.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              className={`flex h-11 items-center gap-2 border px-4 text-[10px] uppercase tracking-[0.1em] transition ${
                showFilters
                  ? "border-[#0e2c1c] bg-[#0e2c1c] text-white"
                  : "border-[#0e2c1c]/20 hover:border-[#0e2c1c]"
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              <ChevronDown
                size={13}
                className={`transition ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            <label className="flex h-11 items-center gap-2 border border-[#0e2c1c]/20 px-3">
              <span className="text-[9px] uppercase tracking-[0.08em] text-[#718477]">
                Sort
              </span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="max-w-[145px] bg-transparent text-[10px] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>
        </div>

        {showFilters && (
          <div className="mt-5 grid gap-4 border border-[#0e2c1c]/10 bg-white p-4 sm:grid-cols-2 sm:p-5">
            <div>
              <label
                htmlFor="product-search"
                className="mb-2 block text-[9px] font-medium uppercase tracking-[0.14em] text-[#607666]"
              >
                Search catalogue
              </label>

              <div className="flex h-11 items-center gap-3 border border-[#0e2c1c]/15 px-3">
                <Search size={16} className="text-[#9c7b47]" />
                <input
                  id="product-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search caps, tees, jackets..."
                  className="w-full bg-transparent text-xs outline-none placeholder:text-[#a0a99f]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="product-category"
                className="mb-2 block text-[9px] font-medium uppercase tracking-[0.14em] text-[#607666]"
              >
                Apparel category
              </label>

              <select
                id="product-category"
                value={activeCategory}
                onChange={(event) => setActiveCategory(event.target.value)}
                className="h-11 w-full border border-[#0e2c1c]/15 bg-white px-3 text-xs outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`border px-3 py-2.5 text-[9px] uppercase tracking-[0.09em] transition sm:px-4 sm:text-[10px] ${
                activeCategory === category
                  ? "border-[#0e2c1c] bg-[#0e2c1c] text-white"
                  : "border-[#0e2c1c]/15 text-[#607666] hover:border-[#0e2c1c]/50 hover:text-[#0e2c1c]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-6 mt-7 flex items-center justify-between">
          <p className="text-[10px] text-[#718477]">
            Showing{" "}
            <span className="font-semibold text-[#173326]">
              {visibleProducts.length}
            </span>{" "}
            products
          </p>

          {(search || activeCategory !== "All Apparel") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Apparel");
                setSort("featured");
              }}
              className="text-[10px] uppercase tracking-[0.1em] text-[#8a6a3f] hover:text-[#0e2c1c]"
            >
              Clear filters ×
            </button>
          )}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <article key={product.id} className="group min-w-0">
                <div className="relative overflow-hidden bg-[#e9ece5]">
                  <Link
                    href={`/shop/product/${product.id}`}
                    aria-label={`View ${product.name}`}
                    className="block aspect-[0.78/1] overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                    />
                  </Link>

                  {product.badge && (
                    <span className="absolute left-2 top-2 border border-white/50 bg-[#f7f8f4]/95 px-2 py-1 text-[8px] font-semibold tracking-[0.1em] text-[#173326] sm:left-3 sm:top-3">
                      {product.badge}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={
                      favorites.includes(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition sm:right-3 sm:top-3 ${
                      favorites.includes(product.id)
                        ? "bg-[#0e2c1c] text-white"
                        : "bg-white/90 text-[#173326] hover:bg-[#0e2c1c] hover:text-white"
                    }`}
                  >
                    <Heart
                      size={16}
                      fill={
                        favorites.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                      strokeWidth={1.5}
                    />
                  </button>

                  <Link
                    href={quoteLink(product)}
                    className="absolute bottom-0 left-0 right-0 flex min-h-11 items-center justify-center gap-2 bg-[#0e2c1c] px-2 text-center text-[9px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#254b35] sm:min-h-12 sm:text-[10px] sm:opacity-0 sm:translate-y-2 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                  >
                    Request bulk quote
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                <div className="pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.12em] text-[#9c7b47]">
                        {product.category}
                      </p>

                      <Link
                        href={`/shop/product/${product.id}`}
                        className="mt-1.5 block text-[11px] leading-5 text-[#183b2a] transition hover:text-[#8a6a3f] sm:text-[13px]"
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[12px] font-semibold sm:text-sm">
                        {formatPrice(product.price)}
                      </p>
                      <p className="mt-1 text-[8px] text-[#718477]">
                        / piece*
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 min-h-10 text-[10px] leading-5 text-[#718477]">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-2 border-y border-[#0e2c1c]/10 py-3">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.1em] text-[#718477]">
                        Sample MOQ
                      </p>
                      <p className="mt-1 text-[10px] font-medium">
                        {product.moq}+ pieces
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] text-[#607666]">
                      <Star
                        size={11}
                        fill="#b58a4b"
                        className="text-[#b58a4b]"
                      />
                      {product.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((color, index) => (
                        <button
                          type="button"
                          key={color}
                          onClick={() =>
                            setSelectedColors((current) => ({
                              ...current,
                              [product.id]: index,
                            }))
                          }
                          aria-label={`Select color ${index + 1} for ${product.name}`}
                          className={`flex h-[19px] w-[19px] items-center justify-center rounded-full border transition ${
                            (selectedColors[product.id] ?? 0) === index
                              ? "border-[#0e2c1c] p-[3px]"
                              : "border-transparent"
                          }`}
                        >
                          <span
                            className="h-full w-full rounded-full border border-black/15"
                            style={{ backgroundColor: color }}
                          />
                        </button>
                      ))}
                    </div>

                    <span className="text-[8px] text-[#718477]">
                      Color options
                    </span>
                  </div>

                  <Link
                    href={quoteLink(product)}
                    className="mt-4 flex min-h-10 items-center justify-center gap-2 border border-[#0e2c1c]/20 px-3 text-[9px] font-medium uppercase tracking-[0.09em] transition hover:border-[#0e2c1c] hover:bg-[#0e2c1c] hover:text-white"
                  >
                    Enquire about this item
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-[#0e2c1c]/10 bg-white py-20 text-center">
            <Search
              size={28}
              className="mx-auto text-[#9c7b47]"
              strokeWidth={1.4}
            />
            <h3 className="mt-4 font-serif text-2xl">No products found.</h3>
            <p className="mt-2 text-xs text-[#718477]">
              Try another search or browse the complete apparel collection.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Apparel");
              }}
              className="mt-5 border border-[#0e2c1c] px-5 py-3 text-[10px] uppercase tracking-[0.12em] transition hover:bg-[#0e2c1c] hover:text-white"
            >
              View all apparel
            </button>
          </div>
        )}

        <p className="mt-5 text-[9px] leading-5 text-[#718477]">
          *Displayed prices and minimum order quantities are illustrative
          catalogue values. Confirm final pricing, available sizes,
          customization and shipping with our team before ordering.
        </p>
      </section>

      {/* BULK ORDER PROCESS */}
      <section className="border-y border-[#0e2c1c]/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[9px] uppercase tracking-[0.23em] text-[#9c7b47]">
              A straightforward process
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-5xl">
              From your idea to your apparel.
            </h2>
            <p className="mt-4 text-xs leading-7 text-[#718477] sm:text-sm">
              A clear process for businesses and brands ordering customized
              apparel in quantity.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                icon: Shirt,
                title: "Choose your apparel",
                detail:
                  "Select the garment category, style and quantity you need.",
              },
              {
                number: "02",
                icon: Sparkles,
                title: "Share your artwork",
                detail:
                  "Tell us about your logo, embroidery placement and preferences.",
              },
              {
                number: "03",
                icon: Clock3,
                title: "Review your quote",
                detail:
                  "Discuss pricing, production timelines and order requirements.",
              },
              {
                number: "04",
                icon: PackageCheck,
                title: "Confirm your order",
                detail:
                  "Finalize the approved specifications and delivery details.",
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="border-t border-[#0e2c1c]/15 pt-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl text-[#c9a76a]">
                      {step.number}
                    </span>
                    <Icon size={22} className="text-[#315c45]" />
                  </div>

                  <h3 className="mt-6 text-sm font-medium">{step.title}</h3>
                  <p className="mt-3 text-xs leading-6 text-[#718477]">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CUSTOM EMBROIDERY */}
      <section className="bg-[#edf1e9]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="relative min-h-[330px] overflow-hidden sm:min-h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"
              alt="Apparel styling and custom brand collection"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e2c1c]/45 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-9 sm:left-9">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/80">
                Customization / ZS
              </p>
              <h3 className="mt-2 font-serif text-3xl italic text-white sm:text-4xl">
                Make every detail count.
              </h3>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <p className="text-[9px] uppercase tracking-[0.23em] text-[#9c7b47]">
              Your identity, stitched in
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              More than apparel.
              <br />
              <span className="italic text-[#315c45]">
                It represents you.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-xs leading-7 text-[#607666] sm:text-sm sm:leading-8">
              Bring your brand to life with custom embroidery on caps,
              shirts, polos, hoodies and jackets. Share your design and
              requirements with our team to discuss the right approach for
              your order.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Company logos and team branding",
                "Uniforms and promotional merchandise",
                "Embroidery placement and artwork discussions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check size={16} className="shrink-0 text-[#8a6a3f]" />
                  <span className="text-xs text-[#315c45]">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="group mt-9 inline-flex w-fit items-center gap-4 border-b border-[#0e2c1c]/40 pb-3 text-[10px] font-semibold uppercase tracking-[0.13em] transition hover:border-[#9c7b47] hover:text-[#8a6a3f]"
            >
              Explore embroidery services
              <ArrowRight
                size={15}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* WHOLESALE CTA */}
      <section className="relative overflow-hidden bg-[#0e2c1c]">
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-white/[0.08]" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-72 w-72 rounded-full border border-[#c9a76a]/20" />

        <div className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:px-12 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-[9px] uppercase tracking-[0.23em] text-[#c9a76a]">
              For brands / teams / businesses
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-white sm:text-6xl">
              Planning your next
              <br />
              <span className="italic text-[#c9a76a]">
                bulk apparel order?
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-xs leading-7 text-white/65 sm:text-sm sm:leading-8">
              Tell us what you need, how many pieces you're planning to
              order and how you'd like your brand represented. Let's discuss
              a solution that fits your requirements.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto">
            <Link
              href="/contact?subject=Bulk%20apparel%20enquiry"
              className="inline-flex min-h-12 items-center justify-center gap-5 bg-[#c9a76a] px-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0e2c1c] transition hover:bg-[#dfc79e]"
            >
              Request a bulk quote
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/20 px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition hover:border-[#c9a76a] hover:text-[#c9a76a]"
            >
              Discuss your project
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="text-[9px] uppercase tracking-[0.23em] text-[#9c7b47]">
          ZS Digitizing / Apparel
        </p>

        <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-5xl">
          The right apparel starts here.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-xs leading-7 text-[#718477] sm:text-sm">
          Whether you're outfitting a team or building a branded clothing
          range, start with a conversation about your requirements.
        </p>

        <Link
          href="/contact"
          className="mt-7 inline-flex min-h-12 items-center gap-4 border border-[#0e2c1c]/20 px-6 text-[10px] font-semibold uppercase tracking-[0.12em] transition hover:border-[#0e2c1c] hover:bg-[#0e2c1c] hover:text-white"
        >
          Contact our team
          <ArrowUpRight size={16} />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
