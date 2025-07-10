export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Static routes based on your app structure
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/companies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chats`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sections`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/user-profile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic routes for products
  const products = await getProducts();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic routes for blogs
  const blogs = await getBlogs();
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.title}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // // Dynamic routes for companies
  const companies = await getCompanies();
  const companyRoutes = companies.map((company) => ({
    url: `${baseUrl}/companies/${company.name}`,
    lastModified: company.updatedAt ? new Date(company.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // // Dynamic routes for categories
  const categories = await getCategories();
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: category.updatedAt
      ? new Date(category.updatedAt)
      : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // // Dynamic routes for add-company-product
  const companyProducts = await getCompanyProducts();
  const companyProductRoutes = companyProducts.map((item) => ({
    url: `${baseUrl}/product/${item.id}`,
    lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Combine all routes
  return [
    ...staticRoutes,
    ...productRoutes,
    ...blogRoutes,
    ...companyRoutes,
    ...categoryRoutes,
    ...companyProductRoutes,
  ];
}

// Data fetching functions - replace with your actual implementation

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/client/products`
    );

    const data = await res.json();

    return data?.data?.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/blogs`);
    const data = await res.json();

    return data?.data?.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

async function getCompanies() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/client/companies`
    );
    const data = await res.json();
    console.log("------- companies -------------");

    console.log(data?.data?.data);

    return data?.data?.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/client/categories`
    );
    const data = await res.json();
    return data?.data?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function getCompanyProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/products`
    );
    const data = await res.json();
    console.log(data?.data?.data);

    return data?.data?.data;
    return [];
  } catch (error) {
    console.error("Error fetching company products:", error);
    return [];
  }
}

// async function getUserAds() {
//   try {
//     // Replace with your actual data fetching
//     return [];
//   } catch (error) {
//     console.error("Error fetching user ads:", error);
//     return [];
//   }
// }
