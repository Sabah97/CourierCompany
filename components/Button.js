export default function Button({ data, title }) {
  return (
    <div>
      <button className="rounded-xl px-4 py-2 mt-12 bg-tertiary">
        <div className="flex flex-row mt-1">
          <span className="text-white font-bold">{title}</span>
          <svg
            className="ml-2"
            width="24"
            height="28"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.17 15L12.59 18.59L14 20L20 14L14 8L12.59 9.41L16.17 13H4V15H16.17Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}

export async function getStaticProps() {
  // const configData = await import(`../siteconfig.json`);

  return {
    props: {
      title,
    },
  };
}
