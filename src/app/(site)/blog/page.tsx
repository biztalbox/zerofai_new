import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { NavigationBar } from "@/components/Navigation";
import { formatBlogDate, getBlogExcerpt, getMediaUrl } from "@/lib/blog";
import { getPayloadClient } from "@/lib/payload";
import type { Post } from "@/payload-types";

export const metadata: Metadata = {
  title: "Blog | ZerofAI",
  description: "Insights, updates, and perspectives on autonomous IT operations from ZerofAI.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let blogs: Post[] = [];
  let dbError = false;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      sort: "-publishedAt",
      depth: 1,
    });
    blogs = result.docs as Post[];
  } catch {
    dbError = true;
  }

  return (
    <main>
      <NavigationBar />

      <section className="relative overflow-hidden md:min-h-[320px] lg:min-h-[360px]">
        <Image
          src="https://plus.unsplash.com/premium_photo-1664474834472-6c7d1e3198e2?w=1600&auto=format&fit=crop&q=60"
          alt="Team collaborating in a modern office"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" aria-hidden />
        <div className="relative mx-auto flex h-full min-h-[280px] container items-center px-6 py-12 md:min-h-[320px] lg:min-h-[360px] lg:px-10 lg:py-16">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              Insights
            </p>
            <h1 className="mt-3 text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem] lg:text-[2.75rem]">
              Blog
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white md:text-base">
              Expert perspectives on AI-driven IT operations, workplace experience, and digital
              transformation.
            </p>
          </div>
        </div>
      </section>

      <section className="container px-6 py-14 lg:px-10 lg:py-20">
        {dbError ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-amber-200/80 bg-amber-50 px-6 py-12 text-center shadow-sm">
            <h2 className="text-xl font-medium text-neutral-900">Blog is being set up</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Could not connect to the database. Verify your Supabase{" "}
              <code className="text-xs">DATABASE_URI</code> in{" "}
              <code className="text-xs">.env.local</code>, then restart the dev server.
            </p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-xl border border-neutral-200/70 bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-xl font-medium text-neutral-900">No posts yet</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Publish your first blog post from the{" "}
              <Link href="/admin" className="text-primary underline-offset-2 hover:underline">
                admin panel
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => {
              const imageUrl = getMediaUrl(blog.heroImage);

              return (
                <article
                  key={blog.id}
                  className="overflow-hidden rounded-xl border border-neutral-200/70 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <Link href={`/blog/${blog.slug}`} className="block">
                    <div className="relative aspect-[16/10] bg-neutral-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={blog.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                          ZerofAI
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {blog.publishedAt && (
                        <time className="text-xs uppercase tracking-[0.08em] text-neutral-500">
                          {formatBlogDate(blog.publishedAt)}
                        </time>
                      )}
                      <h2 className="mt-2 text-lg font-medium leading-snug text-neutral-900">
                        {blog.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                        {getBlogExcerpt(blog)}
                      </p>
                      <span className="mt-4 inline-flex text-sm font-medium text-primary">
                        Read more →
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
