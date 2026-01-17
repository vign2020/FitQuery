import { I_author, I_PaperContent } from "../Types/types";

// 1. indentify what namespaces should be there
// 2. identify which namespace each topic would go into
// 3. attach the title and author name to the abstract.
//4. when user enters a query we need to decide which namespace should be searched.
//5. how to check if the record already exists in the pinecone ?

//namespace 1 . biomechanics , 2 . supplements and diet , 3. Recovery ,adaptation and injury prevention , 4. Cardiovascular and endurance.

//api calls

const Preprocess = async (
  topic: any,
  namespace_name_string: string
): Promise<I_PaperContent[]> => {
  try {
    const preprocess = topic.map((item: any) => {
      let authors = "";
      item.authors.map((item2: I_author, idx: number) => {
        idx + 1 < item.authors.length
          ? (authors += item2.name + " , ")
          : (authors += item2.name + " . ");
      });
      item.title += " " + authors + item.abstract;
      //here the item.title will now contain the title in the first line followed by name of authors and abstract.
      return {
        paperId: item.paperId,
        abstract: item.title,
        namespace_name_string: namespace_name_string,
      };
    });
    // we need to append the title and all the authors name to the first line of abstract.

    return preprocess;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
export const dataIngestion = async (
  topic: any,
  namespace_name_string: string
) => {
  try {
    const result = await Preprocess(topic, namespace_name_string);

    return result;

    //find which namespace it should go to.
  } catch (e) {
    throw new Error(`Error from dataIngestion ${(e as Error).message}`);
  }
};
