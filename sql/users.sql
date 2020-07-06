/*
Navicat MySQL Data Transfer

Source Server         : login
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : lining

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2020-07-04 08:41:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) CHARACTER SET latin1 NOT NULL,
  `emails` varchar(64) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1082 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1074', '测试人员', 'asd123', 'test123@qq.com');
INSERT INTO `users` VALUES ('1075', 'abc123456', 'asd123', '');
INSERT INTO `users` VALUES ('1076', 'abc12345', 'asd123', '');
INSERT INTO `users` VALUES ('1077', 'asdas1', 'asd123', '');
INSERT INTO `users` VALUES ('1078', 'asdasaaa', 'asd123', '');
INSERT INTO `users` VALUES ('1079', 'asdasd', 'asd123', '');
INSERT INTO `users` VALUES ('1080', 'abc123456asd', '5e543256c4', '');
INSERT INTO `users` VALUES ('1081', 'asd123', '5e543256c4', '');
SET FOREIGN_KEY_CHECKS=1;
