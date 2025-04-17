import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

import DefaultLayout from "@/layouts/default";
import { HeartFilledIcon } from "@/components/icons";
import { useFetchMemes } from "@/hooks/useFetchMemes";
import { Meme } from "@/types";

export default function CardsPage() {
  const { data: memes, isLoading, isError, error } = useFetchMemes();

  if (isLoading) return <p>Loading...</p>;

  if (isError)
    throw new Error(
      typeof error === "string" ? error : "An unknown error occurred"
    );

  const safeMemes = Array.isArray(memes) ? memes : [];

  return (
    <DefaultLayout>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
        {safeMemes.map((meme: Meme) => (
          <Card key={meme.id}>
            <CardHeader className="flex justify-center pb-0">
              <Image alt="meme" height={300} src={meme.image} width={300} />
            </CardHeader>
            <CardBody>
              <p className="pb-3 font-bold">{meme.title}</p>

              <div className="flex justify-between">
                <a
                  className="font-mono"
                  href={meme.image}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Image URL
                </a>

                <div className="flex flex-row gap-2">
                  <HeartFilledIcon color="red" />
                  <p className="font-semibold">{meme.likes}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </section>
    </DefaultLayout>
  );
}
