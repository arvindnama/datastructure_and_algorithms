
export interface Node<T> {
  value: T;
  next?: Nullable<Node<T>>;
}


export function createList<T>(values: T[] ): Nullable<Node<T>>{
  if(!values?.length) {
    return null;
  }
  const first: Node<T> = { value: values[0] };
  let nodePtr = first;
  for(let i = 1; i < values.length; i++) {
    const node = {
      value : values[i]
    }
    nodePtr.next = node;
    nodePtr = node;
  }

  return first;

}

export function printList<T>(node: Nullable<Node<T>>, additionalData ?: any) {
  let ptr = node;
  const values: T[] = [];
  while(ptr) {
    values.push(ptr.value);
    ptr = ptr.next;
  }
  console.log(values.join('->'), additionalData)

}