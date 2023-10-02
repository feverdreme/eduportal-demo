export interface useTryResult<T> {
  result: T;
  error: any;
};

export default async function useTry<Type>(promise: Promise<Type>): Promise<useTryResult<Type>> {
  let result = null;
  let error = null;

  try {
    result = await promise;
  } catch (e) {
    error = e;
  }

  // if it's already a useTryPromise
  if (result instanceof Object && "result" in result && "error" in result)
    return result as useTryResult<Type>;

  // create the object elsewise
  return {result, error};
};
