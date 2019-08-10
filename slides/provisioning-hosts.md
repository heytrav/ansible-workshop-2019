### Provisioning Hosts


#### Creating Our Cluster
* For this tutorial we are going to need seven machines
  - 2 for nginx web server
  - 2 for our web application
  - 1 db
  - 1 Load balancer
  - 1 Bastion
* Seems like a lot, but we are trying to simulate upgrades across a cluster


#### Running playbook
```
ansible-playbook ansible/provision-hosts.yml -K
```
* Start the provisioning playbook


#### Our cluster 
* HTTP traffic reaches web hosts via load balancer
![cotd-cluster](img/cotd-bastion-arch.png "COTD cluster") <!-- .element: class="img-right"  width="30%"  -->
* Application receives traffic from web hosts on port 5000
* DB receives traffic from app hosts on 5432
* SSH traffic
  - only bastion reachable from outside
  - all other hosts only from bastion


#### Host Inventory
* The inventory for our cluster is defined in 
  ```shell
  ansible/inventory/cloud-hosts
  ```
* Groups used to define architecture of cluster
  ```ini
  [loadbalancer]
  pycon-lb

  [web]
  pycon-web[1:2]# range of hosts i.e. pycon-web1, pycon-web2

  [app]
  pycon-app[1:2] 
  ```
  <!-- .element: style="font-size:9pt;"  -->
* Hosts may belong to multiple groups
  ```ini
  [web]
  pycon-web[1:2]

  [blue]
  pycon-web1
  ```
  <!-- .element: style="font-size:9pt;"  -->


#### Inventory hosts and groups <!-- .slide: class="image-slide" -->
![cotd-venn](img/cotd-venn.png "COTD venn diagram")


#### Cloud Modules
* Cloud deployments typically involve creating resources with a provider
  - Instances
  - Networks
  - Security groups, acls, etc
* Ansible has [modules](https://docs.ansible.com/ansible/latest/modules/list_of_cloud_modules.html) that cover most providers/resources
* [OpenStack
  Modules](https://docs.ansible.com/ansible/latest/modules/list_of_cloud_modules.html#openstack)


#### The `provision-hosts.yml` playbook
* <!-- .element: class="fragment" data-fragment-index="0" -->Ansible uses openstack API in the background
* <!-- .element: class="fragment" data-fragment-index="1" -->Tasks are executed on *localhost*
   <pre style="font-size:10pt;"><code data-trim data-noescape>
   name:  Provision a set of hosts in Catalyst Cloud
   hosts: <mark>localhost</mark>
   gather_facts: false
   tasks:
</code></pre>
* <!-- .element: class="fragment" data-fragment-index="2" -->Boilerplate for creating multiple cloud hosts
  - log in to cloud provider
  - create router, network, security groups
  - create each host


#### Additional setup for hosts
* Set locale, timezone, etc.
* Edit `/etc/hosts` on each host
  * bastion host to resolve all hosts in cluster
  * loadbalancer host to resolve all hosts in *web* group
  * _web_ to resolve _app_ host
  * _app_ host to resolve _db_
* Update local machine `/etc/hosts` to resolve our loadbalancer public IP


#### Delegation
* Can be tedious to iterate through `hostvars` for each host to find ip
  address
* Delegation allows us to perform action on one host with reference to another
  - eg. assign fixed IP to `/etc/hosts` for one host on another host

  ```
  - name: Map each of the frontend hosts in the loadbalancer
    lineinfile:
      dest: /etc/hosts
      line: "{{ ansible_host }} frontend{{ group_index }}"
    delegate_to: "{{ groups.loadbalancer.0 }}"
  ```



