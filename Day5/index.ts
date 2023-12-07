import utils from "../utils/utils";

type MapRecord = {
  dest: number;
  start: number;
  length: number;
};

type Seed = {
  min: number;
  max: number;
  range: number;
};

const getMapsRecord = (mapsRaw: string[]): Record<string, MapRecord[]> => {
  let currentKey: string = null;
  return mapsRaw.reduce<Record<string, MapRecord[]>>((acc, row) => {
    if (!row.length) return acc;
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
};

const getLowestLocationNumber = (
  seeds: string[],
  mapsRecord: Record<string, MapRecord[]>
): number => {
  return seeds.reduce<number>((lowestNum, seed) => {
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
      parseInt(seed)
    );
    return lowestNum
      ? Math.min(lowestNum, seedAfterGoingThroughAllMaps)
      : seedAfterGoingThroughAllMaps;
  }, null);
};

const getLowestLocationNumber2 = (
  seeds: Seed[],
  mapsRecord: Record<string, MapRecord[]>
): number => {
  return seeds.reduce<number>((lowestNum, seed) => {
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
      seed.max
    );
    return lowestNum
      ? Math.min(lowestNum, seedAfterGoingThroughAllMaps)
      : seedAfterGoingThroughAllMaps;
  }, null);
};

const part1 = (input: string): number => {
  const [seedsRaw, _, ...mapsRaw] = input.split("\r\n");

  const mapsRecord = getMapsRecord(mapsRaw);

  const seeds = seedsRaw.split(":")[1].trim().split(" ");

  return getLowestLocationNumber(seeds, mapsRecord);
};

const part2 = (input: string): number => {
  const [seedsRaw, _, ...mapsRaw] = input.split("\r\n");

  const mapsRecord = getMapsRecord(mapsRaw);

  const seeds = seedsRaw.split(":")[1].trim().split(" ");

  console.log({ seeds });

  let seedsFromRanges: Seed[] = [];
  while (seeds.length) {
    const start = parseInt(seeds.shift());
    const range = parseInt(seeds.shift());

    console.log({ start, range });

    seedsFromRanges.push({
      min: start,
      max: start + range,
      range,
    });
  }

  console.log(seedsFromRanges);

  const lowestLocationNumber = getLowestLocationNumber(seeds, mapsRecord);

  return lowestLocationNumber;
};

utils.log({
  part1: utils.run(part1, "Day5"),
  part2: utils.run(part2, "Day5"),
});
