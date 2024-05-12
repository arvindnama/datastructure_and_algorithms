
export interface Node<T> {
  value: T;
  next?: Nullable<Node<T>>;
}


export function createList<T>(values: T[], allowCircular = false ): Nullable<Node<T>>{
  if(!values?.length) {
    return null;
  }
  const first: Node<T> = { value: values[0] };
  const store: Node<T>[] = [first];
  let nodePtr = first;
  for(let i = 1; i < values.length; i++) {
    let node;
    if(allowCircular) {
      node = store.find((n) => n.value === values[i]);
    }
    node = node || {
      value : values[i]
    };

    store.push(node);
    nodePtr.next = node;
    nodePtr = node;
  }

  return first;

}

export function printList<T>(node: Nullable<Node<T>>, additionalData ?: any) {
  let ptr = node;
  const visited: Array<Node<T>> = []
  const values: T[] = [];
  while(ptr) {
    values.push(ptr.value);
    if(visited.find(v => v.value === ptr?.value)){
      // circle , exit.
      break
    }
    visited.push(ptr);
    ptr = ptr.next;
  }
  console.log(values.join('->'), additionalData)

}