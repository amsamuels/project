import Link from "next/link";
import { Bot, Zap, Shield, BarChart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "Smart Link Management",
    description: "Create and manage branded short links with custom slugs",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Link cloaking, bot detection, and expiring links",
  },
  {
    icon: BarChart,
    title: "Detailed Analytics",
    description: "Track clicks, locations, devices, and referrers",
  },
  {
    icon: Zap,
    title: "Enterprise Features",
    description: "Team management, API access, and white-label options",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal use",
    features: [
      "Up to 50 links",
      "Basic analytics",
      "Standard link slugs",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    description: "For growing businesses",
    features: [
      "Unlimited links",
      "Advanced analytics",
      "Custom domains",
      "Priority support",
      "Team collaboration",
      "Custom slugs",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "White-label solution",
      "API access",
      "SSO integration",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
    {/* Header */}
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Bot className="h-6 w-6" />
          <span className="text-lg">Bouncy.ai</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </div>
    </header>

    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Smart Link Management for
          <br />
          Modern Businesses
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-base md:text-lg">
          Create, manage, and track short links with powerful analytics and enterprise-grade features.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register">
            <Button size="lg">Start for Free</Button>
          </Link>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Card key={i} className="border-2 h-full">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Choose the plan that best fits your needs. All plans include core features with additional capabilities as you grow.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Card key={i} className={`relative ${plan.popular ? "border-primary" : "border-2"}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>

    <footer className="border-t py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <span className="text-lg font-semibold">Bouncy.ai</span>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Bouncy.ai. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  </div>
  );
}