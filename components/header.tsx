"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Bell,
  LogOut,
  User,
  BarChart2,
  Database,
  Scale,
  Brain,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/contexts/language-context";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { translate } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: translate("home"), href: "/" },
    { name: translate("news"), href: "/news" },
    { name: translate("about"), href: "/about" },
    { name: "FAQ", href: "/faq" },
  ];

  const authenticatedNavigation = [
    { name: translate("dashboard"), href: "/dashboard" },
    // { name: translate("profile"), href: "/profile" },
  ];

  const advancedFeatures = [
    {
      name: "Blockchain Explorer",
      href: "/blockchain-explorer",
      icon: Database,
    },
    { name: "AI Fact Checker", href: "/ai-fact-checker", icon: Brain },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Disputes", href: "/disputes", icon: Scale },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getUserInitials = () =>
    user?.username ? user.username.slice(0, 2).toUpperCase() : "EQ";

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={`px-3 py-2 text-sm ${
        pathname === href
          ? "font-medium text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );

  const AdvancedFeaturesDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Advanced Features
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {advancedFeatures.map(({ name, href, icon: Icon }) => (
          <DropdownMenuItem key={name} onClick={() => router.push(href)}>
            <Icon className="mr-2 h-4 w-4" />
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Equipress
          </Link>

          <nav className="ml-10 hidden md:block">
            <ul className="flex space-x-4 items-center">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink href={item.href} label={item.name} />
                </li>
              ))}
              {isAuthenticated &&
                authenticatedNavigation.map((item) => (
                  <li key={item.name}>
                    <NavLink href={item.href} label={item.name} />
                  </li>
                ))}
              {isAuthenticated && user?.role === "admin" && (
                <li>
                  <NavLink href="/admin" label="Admin" />
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <AdvancedFeaturesDropdown />
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          )}

          <div className="hidden md:block">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.profileImage || "/placeholder.svg"}
                        alt={user?.username || "User"}
                      />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span>{user?.username || "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    {translate("profile")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {translate("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => router.push("/login")}>
                {translate("login")}
              </Button>
            )}
          </div>

          <button
            className="ml-4 rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 pb-4 md:hidden">
          <nav>
            <ul className="flex flex-col space-y-2">
              {[
                ...navigation,
                ...(isAuthenticated ? authenticatedNavigation : []),
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      pathname === item.href
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {isAuthenticated && user?.role === "admin" && (
                <li>
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      pathname.startsWith("/admin")
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Admin
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <>
                  <li className="pt-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                    Advanced Features
                  </li>
                  {advancedFeatures.map(({ name, href, icon: Icon }) => (
                    <li key={name}>
                      <Link
                        href={href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center rounded-md px-3 py-2 text-sm ${
                          pathname === href
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>

            <div className="mt-4 flex items-center gap-4">
              <LanguageSwitcher />
              {isAuthenticated ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {translate("logout")}
                </Button>
              ) : (
                <Button onClick={() => router.push("/login")}>
                  {translate("login")}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
