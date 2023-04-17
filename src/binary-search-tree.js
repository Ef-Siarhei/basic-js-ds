const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
   constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
   }
}
class BinarySearchTree {
   constructor() {
      this.roott = null;
   }

   root() {
      return this.roott;
   }

   add(data) {
      const newNode = new Node(data)
      if (!this.roott) {
         this.roott = newNode;
         return;
      }

      let currNode = this.roott;

      while (currNode) {
         if (newNode.data < currNode.data) {
            if (!currNode.left) {
               currNode.left = newNode;
               return
            }
            currNode = currNode.left;
         } else {
            if (!currNode.right) {
               currNode.right = newNode;
               return
            }
            currNode = currNode.right;
         }
      }
   }

   has(data) {
      function search(node, data) {
         if (!node) {
            return false;
         }
         if (node.data === data) {
            return true;
         }
         if (data < node.data) {
            return search(node.left, data)
         } else { return search(node.right, data) };
      }
      return search(this.roott, data);
   }

   find(data) {
      function search(node, data) {
         if (!node) {
            return null;
         }
         if (node.data === data) {
            return node;
         }
         if (data < node.data) {
            return search(node.left, data)
         } else { return search(node.right, data) };
      }
      return search(this.roott, data);
   }

   remove(data) {
      this.roott = removeNode(this.roott, data);

      function removeNode(node, data) {
         if (node === null) {
            return null;
         }

         // если данные, которые нужно удалить, меньше,
         //чем данные корня, переходим к левому поддереву
         if (data < node.data) {
            node.left = removeNode(node.left, data);
            return node;
         }

         // если данные, которые нужно удалить, больше,
         //чем данные корня, переходим к правому поддереву
         if (data > node.data) {
            node.right = removeNode(node.right, data);
            return node;
         }

         // если данные такие как данные корня, удаляем узел

         // удаляем узел без потомков
         if (node.left === null && node.right === null) {
            return node = null;
         }

         // удаляем узел с одним потомком
         if (node.left === null) {
            return node = node.right;
         }
         if (node.right === null) {
            return node = node.left;
         }

         // удаляем узел с двумя потомками
         // minRight правого поддерева хранится в новом узле
         let minRight = node.right;
         while (minRight.left) {
            minRight = minRight.left;
         }
         node.data = minRight.data;
         node.right = removeNode(node.right, minRight.data);
         return node;
      }
   }

   min() {
      if (!this.roott) {
         return null;
      }
      let node = this.roott;
      while (node.left) {
         node = node.left;
      }
      return node.data;
   }

   max() {
      if (!this.roott) {
         return null;
      }
      let node = this.roott;
      while (node.right) {
         node = node.right;
      }
      return node.data;
   }
}

module.exports = {
   BinarySearchTree
};