//topics
// 1. muscular hypertrophy
// 2. muscular strength

import axios from "axios";

const topics = [
  {
    title: "muscular hypertrophy",
    namespace: 2,
  },
  {
    title: "muscular strength",
    namespace: 2,
  },
  {
    title: "creatine supplementation performance",
    namespace: 3,
  },
  {
    title: "HIIT cardiovascular fitness",
    namespace: 5,
  },
  {
    title: "sleep and muscle recovery",
    namespace: 4,
  },
  {
    title: "supplements side-effects",
    namespace: 3,
  },
  {
    title: "sex differences in strength and hypertrophy",
    namespace: 2,
  },
  {
    title: "libido and weight training",
    namespace: 2,
  },
  {
    title: "weight training injuries",
    namespace: 4,
  },
];
//2 , 3, 4, 5
const namespaces = [
  "Biomechanics-exercise-science",
  "diet-and-supplements",
  "Recovery-adaptation-injury",
  "Cardiovascular-and-endurance",
];
// 1. indentify what namespaces should be there
// 2. identify which namespace each topic would go into
// 3. attach the title and author name to the abstract.
//4. when user enters a query we need to decide which namespace should be searched.
//5. how to check if the record already exists in the pinecone ?

//namespace 1 . biomechanics , 2 . supplements and diet , 3. Recovery ,adaptation and injury prevention , 4. Cardiovascular and endurance.

//api calls

export const dataIngestion = async (topic: string) => {
  try {
    const result = await axios.get(
      `https://api.semanticscholar.org/graph/v1/paper/search?query=${topic}&limit=30&fields=title,abstract,authors,year,url`
    );

    return result.data;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
