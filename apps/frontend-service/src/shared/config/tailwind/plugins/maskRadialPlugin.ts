import plugin from "tailwindcss/plugin";
type TailwindPlugin = ReturnType<typeof plugin>;

const maskRadialPlugin: TailwindPlugin = plugin(function ({ matchUtilities }) {
  matchUtilities(
    {
      "mask-radial": (value: string) => ({
        maskImage: `radial-gradient(circle 120px at ${value}, transparent 0%, rgba(0,0,0,0.7) 50%, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle 120px at ${value}, transparent 0%, rgba(0,0,0,0.7) 50%, black 100%)`,
      }),
    },
    {
      values: {
        default: "50% 50%",
      },
      type: "any",
    },
  );
});

export default maskRadialPlugin;
