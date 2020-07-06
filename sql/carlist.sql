/*
Navicat MySQL Data Transfer

Source Server         : login
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : lining

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2020-07-04 08:40:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for carlist
-- ----------------------------
DROP TABLE IF EXISTS `carlist`;
CREATE TABLE `carlist` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `good_id` int(24) NOT NULL,
  `rule` varchar(24) COLLATE utf8mb4_bin NOT NULL,
  `num` int(20) NOT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of carlist
-- ----------------------------
INSERT INTO `carlist` VALUES ('124', 'aaa123', '1003', 'L', '13');
INSERT INTO `carlist` VALUES ('125', 'aaa123', '1003', 'XXL', '13');
INSERT INTO `carlist` VALUES ('126', '测试人员', '1005', '3XL', '26');
INSERT INTO `carlist` VALUES ('141', 'abc123456', '1002', '3XL', '2');
INSERT INTO `carlist` VALUES ('142', 'abc123456', '1002', 'XL', '1');
SET FOREIGN_KEY_CHECKS=1;
