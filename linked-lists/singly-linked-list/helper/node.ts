
export interface ListNode<T> {
  value: T;
  next?: Nullable<ListNode<T>>;
}


export function createList<T>(values: T[], allowCircular = false ): Nullable<ListNode<T>>{
  if(!values?.length) {
    return null;
  }
  const first: ListNode<T> = { value: values[0] };
  const store: ListNode<T>[] = [first];
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

export function printList<T>(node: Nullable<ListNode<T>>, additionalData ?: any) {
  let ptr = node;
  const visited: Array<ListNode<T>> = []
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