### Handling failure


#### Handling failure
```
cd $INTERMED_ANSIBLE_DIR/handlingfailure

```


#### Failing fast

* <!-- .element: class="fragment" data-fragment-index="0" -->When upgrading an application, it's important to stop if there are problems
* <!-- .element: class="fragment" data-fragment-index="1" -->Normally, if an error occurs on a particular host, Ansible will
  - Drop that host from the list of play hosts
  - Proceed to process the play on all other hosts
* <!-- .element: class="fragment" data-fragment-index="2" -->This presents a problem as we may progressively crash all other hosts on same error


#### Failing fast

* Have a look at `failhosts.yml` and `inventory/failhosts`
* Run the playbook:
  ```
  $ ansible-playbook -i inventory/failhosts \
      failhosts.yml --ask-vault-pass
  ```
* The first task fails for `failhost10`
* Play proceeeds to run for `failhost0` thru `failhost9`


#### Stopping on any error

##### `any_errors_fatal`

* Tells Ansible to consider operation a failure if an error occurs on one host
  <!-- .element: class="fragment" data-fragment-index="0" -->
  <pre  class="fragment" data-fragment-index="1"><code data-trim data-noescape>
  - name: Any errors fatal example
    hosts: failhosts
    gather_facts: false
    <mark>any_errors_fatal: true</mark>
    tasks:
  </code></pre>
* Now <!-- .element: class="fragment" data-fragment-index="2" -->if the first task fails for `failhost10`, the entire play will be aborted at the first task


#### Failing based on proportion

##### `max_fail_percentage`

* Defines a percentage of hosts that can fail before operation is aborted <!-- .element: class="fragment" data-fragment-index="0" -->
  <pre  class="fragment" data-fragment-index="1"><code data-trim data-noescape>
  - name: Max fail percentage
    hosts: failhosts
    gather_facts: false
    <mark>max_fail_percentage: 20</mark>
    tasks:
  </code></pre>
* With previous example, playbook finishes because 10% &lt; 20% <!-- .element: class="fragment" data-fragment-index="2" -->



#### Let's break our site
```
ansible-playbook -i inventory/dynamic \
    update-app-in-place.yml -e app_version=v3
```
* Should run an in-place upgrade to _v3_ of our app
* This version has a couple errors that make it fail to start
* While running, watch behaviour of [loadbalancer admin page](http://my-app.cat/haproxy?stats)



#### Make our playbook fail
* <!-- .element: class="fragment" data-fragment-index="0" -->Let's go back to a version that works
   ```shell
   ansible-playbook -i inventory/dynamic  \
       update-app-in-place.yml -e app_version=v2
   ```
* <!-- .element: class="fragment" data-fragment-index="1" -->Uncomment line in `update-app-in-place.yml`
   <pre style="font-size:12pt;"><code data-trim data-noescape>
    - name: Upgrade application in place
      become: true
      hosts: web:&rollingupdate
      serial: 1
      vars:
          database_host: "{{ (groups.db | intersect(groups.rollingupdate))[0] }}"
      <mark>any_errors_fatal: true</mark>
   </code></pre>
* <!-- .element: class="fragment" data-fragment-index="3" -->Try to update to v3 again
* <!-- .element: class="fragment" data-fragment-index="4" -->What happens when Ansible finishes first host update?


#### Bonus exercise
* Repeat previous steps with `max_fail_percentage`
* Imagine in RW that you have &gt;&gt; 2 web hosts in cluster
* Try different values:
   - 10%
   - 25%
   - 50%
   - 75%
