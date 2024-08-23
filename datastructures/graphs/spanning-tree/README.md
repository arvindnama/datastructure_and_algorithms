# Spanning Tree

  Spanning tree of a Graph is a sub tree of the graph, which includes all the connected vertices of the graph and is acyclic.

## Properties of Spanning Tree

    - No. of vertices in spanning tree should be same as that of the graph.
    - No. of edges of a spanning tree is v - 1.
    - vertices in a spanning tree cannot be disconnected.
    - Cost of the Spanning tree is the sum of weights of all its edges.

## Minimum Spanning Tree

    A spanning tree who cost is minimal among all other spanning trees of the graph.

    There are 2 ways to determine MST.

### Prims MST

    - There we start with an arbitrary vertex (first) & place them in MST List
    - find all the edges connecting to the vertices in MST, which does not result in cycle.
    - pick the edge with min weight.
    - add the edge to MST list
    - repeat till we have all vertices in MST list.

### Kruskals MST

    - First we sort all edge in increasing order of there weight.
    - pick the edge with least weight and add it to MST list if edge does not form a cycle.
    - repeat till we have v-1 edges in the list.

    - We use Disjoint sets DS to determine cycle. 
        - i.e. vertices of an Edge (u,v) should not be part of the same disjoint set.
                if so then picking that edge will not result in cycle.
