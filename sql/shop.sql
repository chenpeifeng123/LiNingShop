/*
Navicat MySQL Data Transfer

Source Server         : login
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : lining

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2020-07-04 08:41:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `info` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `src` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1056 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('1001', '【华晨宇同款】巴黎时装周中国李宁2020秋冬系列走秀款男女同款宽松夹克', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536602/thumb_536602.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536612/thumb_536612.jpg\"]', '1299.00');
INSERT INTO `shop` VALUES ('1002', '【华晨宇同款】巴黎时装周中国李宁2020秋冬系列走秀款男女同款收口宽松运动长裤', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536592/thumb_536592.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536582/thumb_536582.jpg\"]', '699.00');
INSERT INTO `shop` VALUES ('1003', '巴黎时装周中国李宁2020秋冬系列男子宽松套头连帽卫衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527593/thumb_527593.jpg\"]', '899.00');
INSERT INTO `shop` VALUES ('1004', '巴黎时装周中国李宁2020春夏系列走秀款Bubble Slide女子篮球场下拖鞋', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202003/538174/thumb_538174.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/562242/thumb_562242.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1005', '【华晨宇心选】巴黎时装周中国李宁2020春夏系列男子短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558543/thumb_558543.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/553804/thumb_553804.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558553/thumb_558553.jpg\"]', '239.00');
INSERT INTO `shop` VALUES ('1006', '巴黎时装周中国李宁2020秋冬系列男子短棉服', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/528033/thumb_528033.jpg\"]', '2199.00');
INSERT INTO `shop` VALUES ('1007', '巴黎时装周中国李宁2020秋冬系列男子时尚宽松套头卫衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527613/thumb_527613.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527603/thumb_527603.jpg\"]', '599.00');
INSERT INTO `shop` VALUES ('1008', '巴黎时装周中国李宁2020秋冬系列男子宽松短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527473/thumb_527473.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527483/thumb_527483.jpg\"]', '339.00');
INSERT INTO `shop` VALUES ('1009', '巴黎时装周中国李宁2020秋冬系列男子宽松套头连帽卫衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527533/thumb_527533.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527523/thumb_527523.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527543/thumb_527543.jpg\"]', '699.00');
INSERT INTO `shop` VALUES ('1010', '【2020新品】巴黎时装周中国李宁2020春夏系列男子时尚宽松运动风衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202006/574440/thumb_574440.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202006/574420/thumb_574420.jpg\"]', '699.00');
INSERT INTO `shop` VALUES ('1011', '【2020新品】巴黎时装周中国李宁2020春夏系列男子平口宽松休闲短裤', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/567833/thumb_567833.jpg\"]', '539.00');
INSERT INTO `shop` VALUES ('1012', '巴黎时装周中国李宁2020春夏系列男子时尚常规短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565232/thumb_565232.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565222/thumb_565222.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1013', '巴黎时装周中国李宁2020春夏系列男子短卫裤', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565252/thumb_565252.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565643/thumb_565643.jpg\"]', '439.00');
INSERT INTO `shop` VALUES ('1014', '巴黎时装周中国李宁2020春夏系列男子短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565242/thumb_565242.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565433/thumb_565433.jpg\"]', '439.00');
INSERT INTO `shop` VALUES ('1015', '巴黎时装周中国李宁2020春夏系列男子短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564205/thumb_564205.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564195/thumb_564195.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1016', '巴黎时装周中国李宁2020春夏系列男子短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564245/thumb_564245.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1017', '巴黎时装周中国李宁2020春夏系列男子时尚常规短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564235/thumb_564235.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564215/thumb_564215.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564225/thumb_564225.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1018', '巴黎时装周中国李宁2020春夏系列男子宽松短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/561423/thumb_561423.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/559085/thumb_559085.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/563490/thumb_563490.jpg\"]', '399.00');
INSERT INTO `shop` VALUES ('1019', '巴黎时装周中国李宁2020春夏系列男子宽松短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/561500/thumb_561500.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/561463/thumb_561463.jpg\"]', '339.00');
INSERT INTO `shop` VALUES ('1020', '巴黎时装周中国李宁2020春夏系列男子宽松短袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/560918/thumb_560918.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/560908/thumb_560908.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/562100/thumb_562100.jpg\"]', '339.00');
INSERT INTO `shop` VALUES ('1021', '巴黎时装周中国李宁2020春夏系列男子时尚宽松短卫裤', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/560527/thumb_560527.jpg\"]', '399.00');
INSERT INTO `shop` VALUES ('1022', '巴黎时装周中国李�?020春夏系列男子短袖巴黎时装周中国李宁2020春夏系列男子短袖POLO衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558582/thumb_558582.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558572/thumb_558572.jpg\"]', '439.00');
INSERT INTO `shop` VALUES ('1023', '巴黎时装周中国李宁2020春夏系列猫爪男子潮流休闲鞋', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202006/571553/thumb_571553.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/524838/thumb_524838.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/528301/thumb_528301.jpg\"]', '899.00');
INSERT INTO `shop` VALUES ('1024', '巴黎时装周中国李宁2020秋冬系列男子长袖文化衫', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/528013/thumb_528013.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527993/thumb_527993.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/528003/thumb_528003.jpg\"]', '399.00');
INSERT INTO `shop` VALUES ('1025', '巴黎时装周中国李宁2020秋冬系列男子宽松套头卫衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527983/thumb_527983.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527973/thumb_527973.jpg\"]', '799.00');
INSERT INTO `shop` VALUES ('1026', '【华晨宇同款】巴黎时装周中国李宁2020秋冬系列走秀款男女同款收口宽松运动长�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536592/thumb_536592.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536582/thumb_536582.jpg\"]', '699.00');
INSERT INTO `shop` VALUES ('1027', '巴黎时装周中国李�?020秋冬系列男子宽松套头连帽卫衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527593/thumb_527593.jpg\"]', '899.00');
INSERT INTO `shop` VALUES ('1028', '【华晨宇同款】巴黎时装周中国李宁2020秋冬系列走秀款男女同款宽松夹�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536602/thumb_536602.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202002/536612/thumb_536612.jpg\"]', '1299.00');
INSERT INTO `shop` VALUES ('1029', '巴黎时装周中国李�?020秋冬系列男子宽松套头卫衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527983/thumb_527983.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527973/thumb_527973.jpg\"]', '799.00');
INSERT INTO `shop` VALUES ('1030', '巴黎时装周中国李�?020秋冬系列男子长袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/528013/thumb_528013.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527993/thumb_527993.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/528003/thumb_528003.jpg\"]', '399.00');
INSERT INTO `shop` VALUES ('1031', '巴黎时装周中国李�?020秋冬系列男子短棉�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/528033/thumb_528033.jpg\"]', '2199.00');
INSERT INTO `shop` VALUES ('1032', '巴黎时装周中国李�?020秋冬系列男子时尚宽松套头卫衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527613/thumb_527613.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527603/thumb_527603.jpg\"]', '599.00');
INSERT INTO `shop` VALUES ('1033', '巴黎时装周中国李�?020秋冬系列男子宽松短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527473/thumb_527473.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527483/thumb_527483.jpg\"]', '339.00');
INSERT INTO `shop` VALUES ('1034', '巴黎时装周中国李�?020秋冬系列男子宽松套头连帽卫衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527533/thumb_527533.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527523/thumb_527523.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/527543/thumb_527543.jpg\"]', '699.00');
INSERT INTO `shop` VALUES ('1035', '�?020新品】巴黎时装周中国李宁2020春夏系列男子时尚宽松运动风衣', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202006/574440/thumb_574440.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202006/574420/thumb_574420.jpg\"]', '699.00');
INSERT INTO `shop` VALUES ('1036', '�?020新品】巴黎时装周中国李宁2020春夏系列男子平口宽松休闲短裤', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/567833/thumb_567833.jpg\"]', '539.00');
INSERT INTO `shop` VALUES ('1037', '巴黎时装周中国李�?020春夏系列男子时尚常规短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565232/thumb_565232.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565222/thumb_565222.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1038', '巴黎时装周中国李�?020春夏系列男子短卫�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565252/thumb_565252.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565643/thumb_565643.jpg\"]', '439.00');
INSERT INTO `shop` VALUES ('1039', '巴黎时装周中国李�?020春夏系列男子短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565242/thumb_565242.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/565433/thumb_565433.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1040', '巴黎时装周中国李�?020春夏系列男子短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564205/thumb_564205.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564195/thumb_564195.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1041', '巴黎时装周中国李�?020春夏系列男子短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564245/thumb_564245.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1042', '巴黎时装周中国李�?020春夏系列男子时尚常规短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564235/thumb_564235.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564215/thumb_564215.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202005/564225/thumb_564225.jpg\"]', '299.00');
INSERT INTO `shop` VALUES ('1043', '巴黎时装周中国李�?020春夏系列男子宽松短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/561423/thumb_561423.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/559085/thumb_559085.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/563490/thumb_563490.jpg\"]', '399.00');
INSERT INTO `shop` VALUES ('1044', '巴黎时装周中国李�?020春夏系列男子宽松短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/561500/thumb_561500.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/561463/thumb_561463.jpg\"]', '339.00');
INSERT INTO `shop` VALUES ('1045', '巴黎时装周中国李�?020春夏系列男子宽松短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/560918/thumb_560918.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/560908/thumb_560908.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/562100/thumb_562100.jpg\"]', '339.00');
INSERT INTO `shop` VALUES ('1046', '巴黎时装周中国李�?020春夏系列男子时尚宽松短卫�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/560527/thumb_560527.jpg\"]', '399.00');
INSERT INTO `shop` VALUES ('1047', '巴黎时装周中国李�?020春夏系列男子短袖POLO�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558582/thumb_558582.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558572/thumb_558572.jpg\"]', '439.00');
INSERT INTO `shop` VALUES ('1048', '巴黎时装周中国李�?020春夏系列猫爪男子潮流休闲�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202006/571553/thumb_571553.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/524838/thumb_524838.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202001/528301/thumb_528301.jpg\"]', '899.00');
INSERT INTO `shop` VALUES ('1049', '【华晨宇心选】巴黎时装周中国李宁2020春夏系列男子短袖文化�?', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558543/thumb_558543.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/553804/thumb_553804.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/558553/thumb_558553.jpg\"]', '239.00');
INSERT INTO `shop` VALUES ('1050', '巴黎时装周中国李�?020春夏系列走秀款Bubble Slide女子篮球场下拖鞋', '[\"https://cdns.lining.com/postsystem/docroot/images/goods/202003/538174/thumb_538174.jpg\",\"https://cdns.lining.com/postsystem/docroot/images/goods/202004/562242/thumb_562242.jpg\"]', '299.00');
SET FOREIGN_KEY_CHECKS=1;
