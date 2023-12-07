import utils from "../utils/utils";

type MapRecord = {
  dest: number;
  start: number;
  length: number;
};

const part1 = (input: string): number => {
  const [seedsRaw, _, ...mapsRaw] = input.split("\r\n");

  let currentKey: string = null;
  const mapsRecord = mapsRaw.reduce<Record<string, MapRecord[]>>((acc, row) => {
    if (!row.length) {
      return acc;
    }

    if (row.length > 0 && !row.match(/\d+/)) {
      currentKey = row.split(" ")[0];
      acc[currentKey] = [];
      return acc;
    }

    const [dest, start, length] = row.split(" ");
    acc[currentKey].push({
      dest: parseInt(dest),
      start: parseInt(start),
      length: parseInt(length),
    });
    return acc;
  }, {});

  const seeds = seedsRaw.split(":")[1].trim().split(" ");

  const lowestLocationNumber = seeds.reduce<number>((lowestNum, seed) => {
    const parsedSeed = parseInt(seed);

    const seedAfterGoingThroughAllMaps = Object.keys(mapsRecord).reduce(
      (seed, recordKey) => {
        const records = mapsRecord[recordKey];
        let mappedSeed: number = seed;
        let foundMatch = false;
        records.forEach((record) => {
          const isInRange =
            seed >= record.start && seed <= record.start + record.length;
          if (isInRange) {
            const differenceFromStart = seed - record.start + record.length;
            const differenceFromDest = seed - record.dest + record.length;
            const difference = differenceFromStart - differenceFromDest;
            if (!foundMatch) {
              mappedSeed = seed + difference;
              foundMatch = true;
              return;
            }
          }
        });

        return mappedSeed;
      },
      parsedSeed
    );

    return lowestNum
      ? Math.min(lowestNum, seedAfterGoingThroughAllMaps)
      : seedAfterGoingThroughAllMaps;
  }, null);

  return lowestLocationNumber;
};

const part2 = (input: string): number => {
  return 2;
};

utils.log({
  part1: utils.run(part1, "Day5"),
  part2: utils.run(part2, "Day5"),
});
