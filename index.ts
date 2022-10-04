import z from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';


const idParser = z.preprocess(
  (uuid) => {
    if (typeof uuid !== 'string') throw new Error(`Expected string, got ${typeof uuid}: ${uuid}`);
    const [type, id] = uuid.split('SEPARATOR');
    return { type, id };
  }, z.object({ type: z.string(), id: z.string() }));
// console.log(zodToJsonSchema(idParser)); // all right
const idParser2 = z.object({
  id: idParser
})
console.log(zodToJsonSchema(idParser2)); // exception Expected string, got undefined: undefined
