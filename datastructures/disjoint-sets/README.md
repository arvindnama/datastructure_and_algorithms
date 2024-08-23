# Disjoint Set

    Two sets are said to be disjoint if they do not have any common element 
    or in simple term there intersection is empty set.

    A Dis-joint set data structure is a special case DS used in case to detemine 
    - if by adding an edge to graph will result in cycle or not.
    - if 2 persons are related or not (direct or indirectly)

## Operation on Disjoint set

    - merging 2 sets --> union
    - finding root or representative element of a given element --> find
    - check if 2 sets are disjoint or not.

### Representing disjoint set

    we use Array (aka parent array) to store all unique sets in Disjoint set collection
    
    - Every set will have one unique representative element 
    - This will help determine if 2 elements are in same set / group or not.
    - if 2 elements have same Representative element then they are not disjoint 

### Techniques to merge & find

### Find

    Finding a Representative element of a set / element.  There are 2 techniques

#### traverse Up

    In this method we traverse up the parent chain till we reach the RE i.e i element who's parent is itself.

    This technique is slow in the worst case we need to traverse O(n) times.

#### Path Compression

    This methods is same as above , but as we start traversing the ladder, we update
    elements' parent with actual RE , this will compress the path and traversal. 
    O(log N)

#### Union

    Merging 2 sets. There are 3 techniques to do so :

##### Simple Union

    - Find the RE of 2 sets (u,v) to be merged. 
    - randomly assign RE of either  u or v's RE to the other.
         i.e. parent[uRE] = vRE or parent[vRE] = uRE

##### Union by Rank or Size

    - Find the RE of 2 sets (u,v) to be merged. 
    - if rank (height of the tree) of uRE is small that of vRE
        merge u into v 
    - else  if rank of vRE is small that of uRE
        merge v into u
    - if they are same either is fine. (just note the new set will be 1 node taller)


