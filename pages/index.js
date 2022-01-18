import Image from "next/image";
import Link from "next/link";
import * as day from "../constants/day";

export default function Home() {
  const arr = [];

  Array.from({ length: day.current }, (el, index) => {
    arr.push(index + 1);
  });

  arr.reverse();

  return (
    <div
      className={`bg-black grid gap-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
    >
      {arr.map((el) => {
        return (
          <Link key={el} href={`/everydays/${el}`} passHref>
            <a className={`cursor-pointer`}>
              <Image
                className={`object-cover transition duration-200 ease-in-out hover:hue-rotate-30`}
                alt=""
                key={el}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
                src={`/stills/${el}.jpg`}
              />
            </a>
          </Link>
        );
      })}
    </div>
  );
}
