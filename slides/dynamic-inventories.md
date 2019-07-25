### Dynamic Inventories


#### Fetching info about cloud hosts
* Local inventory may not have all info about hosts
   - IP addresses
   - OS info
   - meta info about host function (db, appserver, etc.)
* Sometimes need to query cloud vendor to get facts before connecting
* Example: when updating a fleet of hosts
* Static ini files not sufficient


#### Dynamic inventory scripts
* Fetch inventory info programmatically <!-- .element: class="fragment" data-fragment-index="0" -->
* Executable script <!-- .element: class="fragment" data-fragment-index="0" -->
* Interacts with  <!-- .element: class="fragment" data-fragment-index="1" -->
  * LDAP <!-- .element: class="fragment" data-fragment-index="2" -->
  * Database <!-- .element: class="fragment" data-fragment-index="3" -->
  * Cloud host API <!-- .element: class="fragment" data-fragment-index="4" -->
* Outputs JSON <!-- .element: class="fragment" data-fragment-index="5" -->
* Must support two command line flags <!-- .element: class="fragment" data-fragment-index="6" -->
  * `--host=<hostname>` 
  * `--list`


#### Dynamic inventory interface

##### `--list` option

List all groups and details of hosts <!-- .element: class="fragment" data-fragment-index="0" -->
<pre  class="fragment" data-fragment-index="1"><code data-trim data-noescape>
$ ./dynamic-inventory.py --list
{"web": ["training-web1", "training-web2"],
 "app": ["training-app1", "training-app2"],
 "db": ["training-db1"]
 .
 "_meta": {
    "hostvars": {
        "training-web1": {
    }
 }

</code></pre>


#### Dynamic inventory interface

##### `--host=<hostname>` option

Fetch details for a particular host

```
$ ./dynamic-inventory.py --host=training-db1
{ "ansible_host": "192.168.99.101", 
   "ansible_distribution": "Ubuntu",
.
.

```


####  Dynamic Inventories

* Dynamic inventory scripts available for different cloud vendors and applications <!-- .element: class="fragment" data-fragment-index="0" -->
  - <!-- .element: class="fragment" data-fragment-index="1" --><a href="https://raw.github.com/ansible/ansible/devel/contrib/inventory/cobbler.py">Cobbler</a> 
  - <!-- .element: class="fragment" data-fragment-index="2" --><a href="https://raw.github.com/ansible/ansible/devel/contrib/inventory/ec2.py">AWS</a> 
  - <!-- .element: class="fragment" data-fragment-index="3" --><a href="https://raw.githubusercontent.com/ansible/ansible/devel/contrib/inventory/openstack.py">OpenStack</a> 



##### Exercise: OpenStack Dynamic Inventory
* Fetch the example dynamic inventory script for openstack
   ```console
   mkdir -p inventory/dynamic
   cd inventory/dynamic
   wget https://raw.githubusercontent.com/ansible/ansible/devel/contrib/inventory/openstack_inventory.py
   chmod +x openstack_inventory.py
   ```
   <!-- .element: style="font-size:11pt;"  -->
* <!-- .element: class="fragment" data-fragment-index="4" -->Get list of hosts in the stack
   ```console
   export OS_CLOUD=ansible-training
   ./openstack_inventory.py --list
   ```


#### Dynamic inventories in playbooks

* Inventory can be a file or directory of files <!-- .element: class="fragment" data-fragment-index="0" -->
* Ansible will treat<!-- .element: class="fragment" data-fragment-index="1" --> _executable_ files in inventory path as dynamic inventory scripts
  * Configured in `ansible.cfg`
  * Passed to command line option `-i`
  <pre class="fragment" data-fragment-index="2" ><code data-trim data-noescape>
  $ ansible-playbook -i <mark>inventory/dynamic</mark> \ 
              some-playbook.yml
  </code></pre>
