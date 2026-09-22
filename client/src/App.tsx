import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetails } from "./pages/ProductDetails";
import { Login } from "./pages/Login";
import { AdminLayout } from "./admin/AdminLayout";
import { Dashboard } from "./admin/Dashboard";
import { AdminProducts } from "./admin/Products";
import { HomepageEditor } from "./admin/HomepageEditor";
import { PlaceholderAdmin } from "./admin/PlaceholderAdmin";
function StoreShell({children}:{children:React.ReactNode}){ return <><Header/>{children}<Footer/></> }
export default function App(){ return <Routes><Route path="/" element={<StoreShell><Home/></StoreShell>}/><Route path="/shop" element={<StoreShell><Shop/></StoreShell>}/><Route path="/product/:slug" element={<StoreShell><ProductDetails/></StoreShell>}/><Route path="/login" element={<StoreShell><Login/></StoreShell>}/>{["register","forgot-password","account","orders","wishlist","cart","checkout","contact","about","faq","privacy-policy","terms","shipping-policy","return-policy"].map(p=><Route key={p} path={`/${p}`} element={<StoreShell><main className="mx-auto max-w-5xl px-4 py-16"><h1 className="text-4xl font-semibold">{p.replace(/-/g,' ')}</h1><p className="mt-4 text-stone-600">This page is routed and ready for database-backed content or commerce workflow modules.</p></main></StoreShell>}/>) }<Route path="/admin" element={<AdminLayout/>}><Route index element={<Dashboard/>}/><Route path="products" element={<AdminProducts/>}/><Route path="homepage" element={<HomepageEditor/>}/><Route path="categories" element={<PlaceholderAdmin title="Categories"/>}/><Route path="orders" element={<PlaceholderAdmin title="Orders"/>}/><Route path="customers" element={<PlaceholderAdmin title="Customers"/>}/><Route path="pages" element={<PlaceholderAdmin title="Pages"/>}/><Route path="settings" element={<PlaceholderAdmin title="Settings"/>}/></Route></Routes> }
