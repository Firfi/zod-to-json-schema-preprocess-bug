import z from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const idParser = z.preprocess(
  (uuid) => {
    if (typeof uuid !== 'string') throw new Error(`Expected string, got ${typeof uuid}: ${uuid}`);
    const [type, id] = uuid.split('SEPARATOR');
    return { type, id };
  }, z.object({ type: z.string(), id: z.string() }));
const s1 = zodToJsonSchema(idParser);
console.log(s1);
const idParser2 = z.object({
  id: idParser
});
// fails
const s2 = zodToJsonSchema(idParser2);
console.log(s2);
