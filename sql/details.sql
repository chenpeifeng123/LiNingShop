/*
Navicat MySQL Data Transfer

Source Server         : login
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : lining

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2020-07-04 08:41:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for details
-- ----------------------------
DROP TABLE IF EXISTS `details`;
CREATE TABLE `details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `minSrc` text NOT NULL,
  `num` int(11) NOT NULL,
  `flag` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1006 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of details
-- ----------------------------
INSERT INTO `details` VALUES ('1001', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536602/display_536602_1.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536602/display_536602_2.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536602/display_536602_3.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536602/display_536602_4.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536602/display_536602_5.jpg\"]', '1', 'cloth');
INSERT INTO `details` VALUES ('1002', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536592/display_536592_1.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536592/display_536592_2.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536592/display_536592_3.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536592/display_536592_4.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536592/display_536592_5.jpg\"]', '1', 'cloth');
INSERT INTO `details` VALUES ('1003', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527593/display_527593_1.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527593/display_527593_2.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527593/display_527593_3.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527593/display_527593_4.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527593/display_527593_5.jpg\"]', '13', 'cloth');
INSERT INTO `details` VALUES ('1004', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202003/538174/display_538174_1.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202003/538174/display_538174_2.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202003/538174/display_538174_3.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202003/538174/display_538174_4.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202003/538174/display_538174_5.jpg\"]', '7', 'shoes');
INSERT INTO `details` VALUES ('1005', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558543/display_558543_1.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558543/display_558543_2.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558543/display_558543_3.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558543/display_558543_4.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558543/display_558543_5.jpg\"]', '19', 'cloth');
SET FOREIGN_KEY_CHECKS=1;
