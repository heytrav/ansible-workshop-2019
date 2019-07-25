### Set theory tools


#### Set theory in Ansible

```
$ cd $INTERMED_ANSIBLE_DIR/set-theory
.
└── group-set-theory.yml
```


#### Set theory using inventory
* Previously we explored using set theory filters
* It is possible to apply set theory to inventory items as well
* The _hosts_ attribute has syntax for set theory operations on inventory 
* These enable fine control over which hosts playbooks operate
* Run the playbook `group-set-theory.yml`
  ```
  $ ansible-playbook  group-set-theory.yml
  ```


#### Union

Combination of hosts in two groups

![union](img/union.svg "Union") <!-- .element: width="20%" height="20%" -->

All hosts in<!-- .element: class="fragment" data-fragment-index="0" --> _web_ and _db_ groups 

<pre  class="fragment" data-fragment-index="0"><code data-trim data-noescape>
- name: Union of hosts
  <mark>hosts: web:db</mark>
  gather_facts: false
  tasks:
</code></pre>



#### Intersection

Hosts that are in first and second group

![Intersect](img/intersect.svg "Intersection") <!-- .element: width="20%"
height="20%" -->

Hosts that are in both the<!-- .element: class="fragment" data-fragment-index="0" --> _web_ and the _blue_ group 

<pre  class="fragment" data-fragment-index="0"><code data-trim data-noescape>
- name: Intersection of hosts
  <mark>hosts: web:&blue</mark>
  gather_facts: false
  tasks:
</code></pre>


#### Difference

Set of hosts in first set but not in second set

![Difference](img/difference.svg "Difference")<!-- .element: width="20%"
height="20%" -->

Hosts that are in the<!-- .element: class="fragment" data-fragment-index="0" --> _wellington_ group **but not** in the _blue_ group

<pre  class="fragment" data-fragment-index="0"><code data-trim data-noescape>
- name: Difference of groups
  <mark>hosts: wellington:!blue</mark>
  gather_facts: false
  tasks:
</code></pre>


#### Summary

* Ansible provides tools for manipulating sets of items
* Set theory filters can be used for working on lists
* Set theory operators can also be applied to inventory items when running
  playbooks
* Enable fine tuning of operations in playbooks
