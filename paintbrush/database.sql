/*
SQLyog Ultimate v8.54 
MySQL - 5.5.58-log : Database - paintbrush
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `appusers` */

CREATE TABLE `appusers` (
  `idusers` bigint(20) NOT NULL AUTO_INCREMENT,
  `emailid` text NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `last_loggedin` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `recordtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8;

/*Data for the table `appusers` */

insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (0,'admin@symbioticinfo.com','admin','5f4dcc3b5aa765d61d8327deb882cf99 ','2017-10-12 18:35:20','active','2014-04-01 09:22:11','admin');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (2,'content@m-tutor.com','mtutor','5f4dcc3b5aa765d61d8327deb882cf99 ','2017-07-13 12:34:32','active','2014-04-01 09:22:11','content');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (3,'vasanthakumari.k@m-tutor.com','vasantha','5f4dcc3b5aa765d61d8327deb882cf99 ','2016-08-08 12:15:41','active','2015-08-26 19:13:27','mtutor');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (4,'ramya.b@m-tutor.com','ramya','2c2e31687c79225c26f45729e982d982','2016-06-02 18:43:16','active','2015-08-26 19:14:03','mtutor');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (5,'jessijohnbasco@m-tutor.com','jessi','17107a0d732f0792e25e68e36a9ce2a5','2016-05-20 15:33:30','active','2015-08-26 19:14:38','mtutor');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (6,'makesh.sv@m-tutor.com','mahesh','c5a7d18eb6bf518b0d92ca205f247d9a','2016-05-20 12:13:19','active','2015-08-26 20:17:09','mtutor');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (7,'srijananiroche@m-tutor.com','janani','58c9a57e84fc2e70ec70fbad96595db7','2016-05-20 15:37:15','active','2015-08-26 20:18:39','mtutor');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (8,'kirubadevi.v@m-tutor.com','kirubadevi','5023825106cc51f22a84379ce666e6b9','2016-05-20 15:35:49','active','2015-08-26 20:19:03','mtutor');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (9,'naveenkumar.r@symbioticinfo.com','Naveen Test','ef1245ddc3c860e318d3d7c0d0bfabd2','2016-05-06 16:09:42','active','2015-09-21 16:59:18','mtutor');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (10,'admin@m-tutor.com','Mtutor admin','5f4dcc3b5aa765d61d8327deb882cf99 ','2017-04-25 19:48:37','active','2014-04-01 09:22:11','admin');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (11,'qc@m-tutor.com','qc admin','5f4dcc3b5aa765d61d8327deb882cf99 ','2016-08-08 12:45:11','active','2015-10-28 15:35:46','qc');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (12,'vasanthakumari.pm@m-tutor.com','vasantha','5c4e70c94c83de2ee1f4007fb5e18500','2016-05-20 12:10:55','active','2015-10-28 15:36:24','pm');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (13,'ramya.pm@m-tutor.com','ramya','8d9ccdd0915ab9cd5de80d42e871cfda','2016-05-20 10:58:00','active','2015-10-28 15:36:24','pm');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (14,'jessi.pm@m-tutor.com','jessi','a6338cc068f70b74e48dcdc5961da6af','2016-05-20 09:49:14','active','2015-10-28 15:36:24','pm');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (15,'makesh.pm@m-tutor.com','makesh','2d01f577dfeda544a201077986a272df','2016-05-19 19:44:44','active','2015-10-28 15:36:24','pm');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (16,'janani.pm@m-tutor.com','janani','bcf8f867c728eb3506c14c6dc215ffb6','2016-05-20 11:27:44','active','2015-10-28 15:36:24','pm');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (17,'kiruba.pm@m-tutor.com','kirubadevi','dd1259cd93ababcb12e4f4803aa16e16','2016-05-20 14:12:43','active','2015-10-28 15:36:24','pm');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (18,'support@m-tutor.com','Support','8ba05005dae77ada509fbbe81879131d','2016-05-18 17:54:24','active','2015-11-21 17:54:55','content');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (19,'thai@m-tutor.com','thai','3c34462728c84671de1f437cbccfcd87','2016-05-14 17:06:50','active','2015-08-26 20:19:03','mtutor');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (20,'thai-pm@m-tutor.com','thai pm','b97771488349914ab0e5560f0db2e16f','2016-01-25 16:01:47','active','2015-10-28 15:36:24','pm');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (21,'itsupport@m-tutor.com','it support','5f4dcc3b5aa765d61d8327deb882cf99 ','2016-08-08 12:41:50','active','2015-12-29 19:49:33','it');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (22,'support@m-tutor.com','support','5f4dcc3b5aa765d61d8327deb882cf99 ','2016-08-08 12:29:43','active','2016-03-08 13:22:36','support');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (23,'demo@m-tutor.com','demo','fe01ce2a7fbac8fafaed7c982a04e229',NULL,'active','2016-09-08 11:39:15','demo');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (24,'demo_english@m-tutor.com','demo_english','4893ab1f4d6ab8f0b2f92fa00b999df6',NULL,'active','2016-09-08 11:40:28','demo');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (25,'atutorinternationalsupport@m-tutor.com','atutor','5f4dcc3b5aa765d61d8327deb882cf99 ','2017-03-29 15:41:10','active','2017-03-15 10:25:08','atutor_support');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (26,'yyy','xx','zzz',NULL,'active','2017-06-12 16:00:06','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (27,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (28,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (29,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (30,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (31,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (32,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (33,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (34,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (35,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (36,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (37,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (38,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (39,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (40,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (41,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (42,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (43,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (44,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (45,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (46,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (47,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:20','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (48,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (49,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (50,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (51,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (52,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (53,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (54,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (55,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (56,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (57,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (58,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (59,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (60,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (61,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (62,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (63,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (64,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (65,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (66,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (67,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (68,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:21','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (69,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (70,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (71,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (72,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (73,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (74,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (75,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (76,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (77,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (78,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (79,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (80,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (81,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (82,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (83,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (84,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (85,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (86,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (87,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (88,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (89,'yyy','xx','zzz',NULL,'active','2017-06-12 16:04:26','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (90,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (91,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (92,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (93,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (94,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (95,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (96,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (97,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (98,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (99,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (100,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (101,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (102,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (103,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (104,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (105,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (106,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (107,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (108,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (109,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (110,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (111,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (112,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (113,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (114,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:41','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (115,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (116,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (117,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (118,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (119,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (120,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (121,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (122,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (123,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (124,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (125,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (126,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (127,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (128,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (129,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (130,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (131,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:42','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (132,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (133,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (134,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (135,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (136,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (137,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (138,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (139,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (140,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (141,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (142,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (143,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (144,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (145,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (146,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (147,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (148,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (149,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (150,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (151,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (152,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:04:47','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (153,'asdf@asdf.com','fsdg','asdfjhj',NULL,'active','2017-06-12 16:05:03','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (154,'asdf','sadf','asdf',NULL,'active','2017-06-12 16:06:02','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (155,'kjh','jkhk','kjhkj',NULL,'active','2017-06-12 16:06:36','');
insert  into `appusers`(`idusers`,`emailid`,`username`,`password`,`last_loggedin`,`status`,`recordtime`,`user_type`) values (156,'sdfg','sdg','8796518284',NULL,'active','2017-06-14 10:31:03','');

/*Table structure for table `artist` */

CREATE TABLE `artist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(250) NOT NULL,
  `thumbimage` varchar(250) DEFAULT NULL,
  `bannerimage` varchar(250) DEFAULT NULL,
  `about` text,
  `dob` date DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `facebook` varchar(250) DEFAULT NULL,
  `googleplus` varchar(250) DEFAULT NULL,
  `twitter` varchar(250) DEFAULT NULL,
  `printrest` varchar(250) DEFAULT NULL,
  `graduate` varchar(250) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `title1` varchar(250) DEFAULT NULL,
  `desc1` text,
  `title2` varchar(250) DEFAULT NULL,
  `desc2` text,
  `status` enum('active','inactive') NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `artist` */

insert  into `artist`(`id`,`name`,`image`,`thumbimage`,`bannerimage`,`about`,`dob`,`city`,`state`,`facebook`,`googleplus`,`twitter`,`printrest`,`graduate`,`country`,`title1`,`desc1`,`title2`,`desc2`,`status`,`createdOn`) values (1,'Ashoke Mullick','2017080415184801.png','ashok_thumb.jpg','20170804151848ashoke_banner.jpg','<b>Ashoke Mullick</b> born in Kolkata is a first class graduate from \r\nGovernment college of Arts and Craft. He was awarded the Cultural \r\nScholarship by Department of Culture, Government of India during \r\n1981-82. His paintings include a strong focus on the ordinary person â€“ \r\nmore specifically womankind and their contradictions that faced. The \r\nartist likes to portray the contemporary age where people have lost the \r\nhuman touch and have become increasingly impersonal in their behaviour; \r\nhe touches the facts of life and reality. He canvases his beautiful \r\nthoughts on real and unreal world into a bold, vibrant imagination and \r\nenergetic which is extremely appealing.','1957-03-03','Kolkata','West Bengal','http://www.facebook.com/','http://www.googleplus.com','http://www.twitter.com','http://www.pinterest.com',NULL,'India','Others','<ul><li> 1986 Academy of Fine Arts, Kolkata</li><li> 1989 Pundole Art Gallery, Mumbai</li><li> 1991 Display Gallery, New Delhi, organized by Pundole Art Gallery</li><li> 1992 Galerie \'88, Kolkata</li><li> 1993 Galerie \'88, Kolkata</li><li> 1994 Park Hotel, Kolkata</li><li> \"Works on Paper\", Pundole Art Gallery,</li><li> 1995 The Gallery,Chennai</li><li> 1996 Crimson, Bangalore</li><li> 1997 Art Today, New Delhi</li><li> 1998 Jehangir Art Gallery, Mumbai</li><li> 2001 Galerie \'88, Kolkata</li></ul>','Group Exhibitions and Workshops','<p>His works were featured in numerous group shows across the country \r\nand abroad, some of the noted shows include â€˜Calling Bengalâ€™, at \r\nNitanjali Art Gallery, New Delhi; â€˜Art of Drawingâ€™ curated by \r\nShuvaprasanna Bhattacharya at Gallery La Mere, Kolkata; â€˜Evamâ€™, \r\npresented by The Company Theatre at Tao Art Gallery, Mumbai; â€˜Vote \r\nTumikarâ€™, CIMA Art Gallery, Kolkata; â€˜Different strokesâ€™, Polka Art \r\nGallery, New Delhi; â€˜Roots in Hueâ€™, Jehangir Art Gallery, Mumbai; â€˜India\r\n Surrealismâ€™ curated by Prof. Sovam Som at Aakriti Art Gallery, Kolkata;\r\n â€˜Digressing Domainsâ€™ curated by Sushma k Bahl presented at Nitanjal Art\r\n Gallery, New Delhi; â€˜Unayanâ€™, Nvya Art Gallery, New Delhi besides shows\r\n abroad in New York, France, Singapore, Dubai, Malaysia, Dhaka, Hong \r\nKong, Japan, Germany, Stuttgart, and Sweden.</p>\r\n								<p>Mullick has participated in several art camps and workshops \r\nheld at Max Muller Bhavan, Kolkata; Kalakriti Art Gallery, Hyderabad; \r\n100 years of Cellular Jail, at Andaman & Nicobar Islands; Tata \r\nSteel, Jamshedpur; Khulana Art College, Khulana - Bangladesh; Koh-Samui,\r\n Thailand besides many more. Mullickâ€™s works are a part of several \r\nIndividual and Institutional collections in India and abroad.</p>','active','2017-08-04 15:18:48');
insert  into `artist`(`id`,`name`,`image`,`thumbimage`,`bannerimage`,`about`,`dob`,`city`,`state`,`facebook`,`googleplus`,`twitter`,`printrest`,`graduate`,`country`,`title1`,`desc1`,`title2`,`desc2`,`status`,`createdOn`) values (3,'Dewashish Das','2017080415590503.png','dewashis_thumb.jpg','20170804155905dewashish_banner.jpg','<p><b>Dewashish Das</b> a young painter, born in Bihar at 1970 is a \r\nB.V.A. graduate from Rabindra Bharati University Kolkata in 1995. His \r\npaintingâ€™s is an observation of nature and life.His paintings, which are\r\n done mostly in acrylic on canvas, beside other mediums are inspired by \r\nnature. He takes human being as part of nature and feminine beauty as \r\nits highest expression.</p>\r\n								<p>He place this beauty in his paintings against other elements \r\nof nature, flower, creepers or some docile lyrical creatures and set a \r\nmute dialogue between them.This is help his to generate a kind of \r\nclassical sobriety. Decorativeness is an essential ele4ments of folk and\r\n tribal art, high art, despite its stress on some essential revealing \r\ncontent.</p>\r\n								<p>Delectable or otherwise, very often resorts to this \r\ndecorative element to infuse a kind of luminal space within the observed\r\n reality. Reality is thus gets transcended towards a divine super \r\nreality.</p>\r\n								<p>His search is for an idealized beauty based on life, festival in moods of life, style and nature.</p>','1970-03-03','Patna','Bihar','http://www.facebook.com/','www.googleplus.com','www.twitter.com','www.pinterest.com',NULL,'India','Solo Exhibition','<ul><li> ACADEMY OF FINE ARTS â€“ 2005 to 2016</li><li> JEHANGIR ART GALLERY â€“ 2006 (Mumbai)</li><li> MAHUA ART GALLERY - 2006 (Bangalore)</li><li> ART PILGRIM</li><li> KUMAR ART GALLERY - 2006 to 2009 (Delhi)</li><li> LALIT KALA ACADEMY (DELHI) â€“ 2005</li><li> GALLERY GANESHA, KUMAR ART \r\nGALLERY, ART PILGRIM, DOMAS ART GALLERY, MEC ART GALLERY , FINLAND \r\nEMBASSY, HOTEL ASHOKA,DELHI (IN THE YR.1997 TO 2016), ART INDUS,</li><li> MAHUA ART GALLERY</li><li> ETHOS ART GALLERY</li><li> KINKINI ART GALLERY (Bangalore)</li><li> ART WORLD (Chennai)</li><li> JEHANGIR ART GALLERY - 2006,2009, 2011, 2013</li><li> LALIT KALA ACADEMY - 1997 TO 2006 &2013</li><li> ACADEMY OF FINE ART - 2006 TO 2013 (Kolkata)</li></ul>\r\n\r\n								<h5><b>Group Exhibitions and Workshops</b></h5>\r\n								<p>He has participated in many more group shows across Mumbai, Hyderabad, Delhi, Bangalore, Chennai, Kolkata and abroad</p>\r\n								<ul><li> USA, SINGAPORE, LONDON, TEXAS, DUBAI etc.</li></ul>','Art & Painting Workshops','USA, SINGAPORE, LONDON, TEXAS, DUBAI etc.<ul><li> FINLAND EMBASSY (Delhi) -2008</li><li> VEDIC VILLAGE -2009</li><li> BANKOK &KOH SAMOI â€“ 2009</li><li> ASSAM & DARJEELING -2006</li><li> HOTEL OBEROI, GRAND -2006 TO 2009</li><li> HIGHLAND PARK â€“ 2006,2007</li><li> JAMMU & KASHMIR -2013</li><li> SHANTI NIKETAN â€“ 2006, 2016 (W.B.)</li><li> PONDCHERY â€“ 2013, 2015</li><li> EMANI FOUNDATION â€“ 2008 TO 2013</li></ul>\r\n								<p>And many more workshop of paintings at TATA STEEL & AIRTEL, EMAMI GROUP,</p>\r\n								<ul><li> HOTEL NAVOTAL, HOTEL HYATT (Kolkata) and RPG GROUP IN THE YEAR 2003 TO 2016.</li></ul>','active','2017-08-04 15:59:05');
insert  into `artist`(`id`,`name`,`image`,`thumbimage`,`bannerimage`,`about`,`dob`,`city`,`state`,`facebook`,`googleplus`,`twitter`,`printrest`,`graduate`,`country`,`title1`,`desc1`,`title2`,`desc2`,`status`,`createdOn`) values (4,'Partha Bhatacharjee','2017080416053302.png','partha_thumb.jpg','20170804160317partha_banner.jpg','<b>Partha Bhatacharjee</b> born in 1962 at Chandannagar, Hooghly - West \r\nBengal is a graduate in fine art from Government college of Arts and \r\nCraft Kolkata. He has a Special training in modern technique and \r\nportrait painting under the able guidance of eminent art professors of \r\nKolkata.','1962-03-03','Hoogly, Kolkata','West Bengal','http://www.facebook.com','www.googleplus.com','www.twitter.com','www.pinterest.com',NULL,'India','Solo Exhibition','<ul><li> 1995 â€œTribute to Satyajit Rayâ€, Kolkata</li><li> 1996 Durga gallery, Mumbai</li><li> 1997 Nairibi, Kenya & kent (U.K)</li><li> 2001 Cymroza art gallery Mumbai</li><li> 2002 Zen Gallery, Bangalore; Indian art gallery, Pune</li><li> 2003 â€œpast & presentâ€ academy of fine arts, Kolkata</li></ul>','Participated / Group Exhibition','<ul><li> 1982-1999: Annual exhibition at academy of fine arts</li><li> State Lalit Kala academy</li><li> Indian society of oriental art, Kolkata</li><li> Young contemporary artists of Kolkata</li><li> Annual exhibition of govt. of west Bengal</li><li> Reflection group R.F.I Group</li><li> Annual Exhibition Of Birla Academy Kolkata</li><li> Annual exhibition of gallery 88</li><li> West Bengal Sahitya Academy Govt Of West Bengal</li><li> Post-Independence Art In India, Kolkata</li><li> Contemporary art of Bengal â€œAustralia Embassyâ€, New Delhi</li><li> 2000-2006 Annual Exhibition & open air exhibition at Birla academy Kolkata. 50th independence celebration</li><li> Exhibition at Chennai, Mumbai, New Delhi &Kolkata by Lalit Kala Academy, New Delhi</li><li> Best of Indian Contemporary art at SINGAPORE.</li><li> â€œThree Artists from Indiaâ€ at Bangkok</li><li> â€œYoung facesâ€ at Kolkata</li><li> â€œartist of Indiaâ€ & small formateâ€ by art today in new Delhi</li><li> â€œTradition & Modernity of Bengalâ€ at new Delhi & Bangalore</li><li> â€œContemporary Art of Bengalâ€ at Oberoi Grand Kolkata</li><li> â€œIntroduction â€œ at Oberoi Grand by Birla Academy</li><li> Painting of Bengal at Delhi by park hotel, SPANDAN</li><li> â€œART WALKâ€ at oberoi Grand Kolkata by spandan & Oberoi Grand</li><li> â€œPRACHI PRATICHIâ€ Indo-Bangladesh exhibition at Kolkata and Dhaka.</li><li> Millennium National Exhibition by AIFACS, Delhi.</li></ul>','active','2017-08-04 16:03:17');
insert  into `artist`(`id`,`name`,`image`,`thumbimage`,`bannerimage`,`about`,`dob`,`city`,`state`,`facebook`,`googleplus`,`twitter`,`printrest`,`graduate`,`country`,`title1`,`desc1`,`title2`,`desc2`,`status`,`createdOn`) values (5,'Shekhar Kar','2017080416081005.png','sekar_thumb.jpg','20170804160810sekhar_banner.jpg','<p><b>Shekhar Kar</b> an artist from West Bengal whose arts revolves \r\naround the characters and emotions of human race, he is a postgraduate \r\nin Visual Arts from Rabindra Bharati University Calcutta, with his great\r\n passion on art and painting he brings out the various illustrations of \r\nreal life. His paintings featuring the human form show the uniqueness \r\nand culture in the state and its human form, be it male or female are \r\nportrayed as strong and central to the theme. Every element in his \r\npainting is natural and in depth and he is more keen in acrylic painting\r\n with intense color base.</p>\r\n								<p>He has participated in several workshops in India, Finland, \r\nSrilanka, Thailand, Singapore, Indonesia and many other countries and \r\nhas showcased his art work in multiple solo and group exhibitions.</p>','1958-03-03','Kolkata','West Bengal','http://www.facebook.com/','www.googleplus.com','www.twitter.com','www.pinterest.com',NULL,'India','Solo Exhibitions','<ul><li> Gallery Sundaram (Calcutta) 1990</li><li> Alliance Francaise De (Delhi) 1995</li><li> Bajaj Art Gallery (Mumbai) 1995</li><li> Jharokha Art Gallery (Delhi) 1995</li><li> Suksiti (Calcutta) 1996</li><li> Art Konsult (Delhi) 2000</li><li> Crimson Art Gallery (Bangalore) 2002</li><li> Chemould Art Gallery (Calcutta) 2003</li><li> Krishna Collector Center (Delhi) 2004</li><li> Names and Art (Calcutta) 2006</li><li> Right Lines Gallery (Bangalore) 2008</li><li> Japon Chitra Gallery (Calcutta) 2007</li></ul>','Group Exhibitions and Workshops','<p>Extensive participation in group exhibitions held in Kolkata at the \r\nAcademy of fine arts, Birla Academy Chitrakoot Gallery, Akriti Gallery. \r\nGallery 88, Gallery Nakshatra, Gallery Konishka, Miraj Gallery Spondan, \r\nAbstract Art Gallery, Artist Centre, Gallery Image, Alit kala Academy, \r\nDhoomimal art Gallery and also participated in India Art Summit at \r\nDelhi, Modern Art Gallery Delhi, Municipal Gallery London, Five City of \r\nAmerica, Dubai, Singapore, Bangladesh, France. Finland, Chennai, Pune, \r\nHyderabad, Bangalore, London, Mumbai auction at Delhi.</p>\r\n								<p>He participated in several workshops in India, Finland, \r\nSrilanka, Thailand, Singapore, and Indonesia...etc. Works private for \r\nmuseum collections, corporate houses, offices and galleries in India and\r\n abroad.</p>','active','2017-08-04 16:08:10');
insert  into `artist`(`id`,`name`,`image`,`thumbimage`,`bannerimage`,`about`,`dob`,`city`,`state`,`facebook`,`googleplus`,`twitter`,`printrest`,`graduate`,`country`,`title1`,`desc1`,`title2`,`desc2`,`status`,`createdOn`) values (6,'Shyamal Mukherjee','2017080416114606.png','shymal_thumb.jpg','shyamal_banner.jpg','<p><b>Shyamal Mukherjee </b> born in 1961 at Khanpur-West Bengal holds a BFA and MFA qualification from Ravindra Bharati University.</p>\r\n								<p>He has spent his entire life in Calcutta, only venturing out \r\nto attend showings of his works, and only speaking in Bengali. He has \r\nspent all of his college years in Santiniketan, first completing his BFA\r\n in 1987, and then his MFA in 1989 from the Rabindra Bharati University.</p>\r\n								<p>In Mukherjee\'s work, we see the Bengal School strong \r\nfigurative tradition being carried ahead and interpreted in a very \r\ncontemporary idiom. Mukherjee loves to travel alone in new places on \r\nbuses and trains saying that, \"Most of my inspiration comes from \r\nobserving people.\" It\'s not surprising that every figure in his body of \r\nworks has a separate and interesting story to tell. Most of the people \r\nMukherjee paints are performers of some type, putting on an act for \r\neveryone else - something all of us do every day of our lives. \r\nMukherjee\'s figures are dressed in the bright, almost gaudy orange, red \r\nand green costumes that street performers wear, but their eyes are \r\ngazing and drawn, their faces almost cartoon like and their fingers \r\npodgy, making the irony and pathos that surrounds them extremely \r\nevident. For one of his recent shows in Mumbai, the artist decided to \r\nuse beggars and street vendors as the subject of his works, essaying \r\ntheir pitiable condition in his trademark style.</p>\r\n								<p>The artist also likes to focus on the fact that each \r\nindividual has a great deal in common with every other one. This is why \r\nhe paints people in pairs or larger groups, highlighting that though \r\nthey are physically separate and unlike each other, there is no real \r\ndifference between their characters and behaviours.</p>','1961-03-03','Kolkata','West Bengal','http://www.facebook.com/','www.googleplus.com','www.twitter.com','www.pinterest.com',NULL,'India','Interest','Mukherjee\'s favourite medium is reverse oil or acrylic painting on \r\ntransparent acrylic sheets, and he swears that although he may change \r\nhis themes and subjects, inventing new ones for new shows, he will never\r\n give up painting in this medium. Although Mukherjee loves to paint, he \r\nsays he has many other hobbies. He teaches children in his spare time, \r\nand says that he learns more from them than they realize. He also \r\ncollects rural artworks and the crafts of Bengali artisans.','Diary','<ul><li> With several honours and awards to his credit, he has participated in various exhibitions and workshops in India. </li><li> His works are in collections all over the world. </li><li> He is a life member of The Bombay Art Society</li></ul>\r\n								A special mention about the artists working acclaim rests in his acrylic sheets with both sides comprising his paintings','active','2017-08-04 16:11:46');
insert  into `artist`(`id`,`name`,`image`,`thumbimage`,`bannerimage`,`about`,`dob`,`city`,`state`,`facebook`,`googleplus`,`twitter`,`printrest`,`graduate`,`country`,`title1`,`desc1`,`title2`,`desc2`,`status`,`createdOn`) values (7,'Subrata Das','2017080416145807.png','subratha_thumb.jpg','20170804161458subrata_banner.jpg','<p><b>Subrata Das</b> born in Kolkata and studied a Foundation Course \r\nfrom â€œCollege of Visual Arts â€œ Kolkata. The works of Subrata Das have \r\nbeen very poetic representation. He depicts characters from the Indian \r\nMythology. His current series focuses on the Divine love of Radha \r\nKrishna, His canvases have a lot of Flora and Fauna Elements, Flute \r\nbeing a constant motif in his paintings giving a surreal mood. Subrata \r\nworks are Traditional and ethnic with a touch of the Modern. His medium \r\nis Acrylic on Canvas & Mixed medium with semi realistic and \r\nexpressive features and colours.</p>\r\n								<p>Subrata has received GOLD and SILVER Awards from â€œAvantika \r\nInternational Art Exhibitionâ€ and Certificate of Merit from â€œAll India \r\nYouth Art Exhibitionâ€. His paintings are in collection of UNESCO, TATA \r\nsteel ITC Group, Raj Bhavan â€“ Kolkata, Bangladesh High Commission, RPG \r\nEnterprises, TAJ Group of Hotels and various corporate houses and \r\nprivate collections in India and abroad.</p>','1970-03-19','Kolkata','West Bengal','http://www.facebook.com/','www.googleplus.com','www.twitter.com','www.pinterest.com',NULL,'India','Solo Exhibition','He has held over ten solo shows in Mumbai, Delhi, Bangalore, Gurgaon, Hyderabad, Pune and Kolkata, Dubai, Singapore.','Group Shows And Exhibition','<p>And several prestigious groups show in India and abroad. Participated Annual Shows of Birla Academy</p>\r\n								<ul><li> Academy of Fine Arts</li><li> AIFACS, National Exhibition</li><li> Avantika International Art Exhibition</li><li> Bengal Art Festival in LONDON, etc.</li></ul>','active','2017-08-04 16:14:58');
insert  into `artist`(`id`,`name`,`image`,`thumbimage`,`bannerimage`,`about`,`dob`,`city`,`state`,`facebook`,`googleplus`,`twitter`,`printrest`,`graduate`,`country`,`title1`,`desc1`,`title2`,`desc2`,`status`,`createdOn`) values (8,'Puspen Niyogi','2017080416174004.png','pushpen_thumb.jpg','20170804161740puspen_banner.jpg','<b>Puspen Niyogi</b> born in 1967 from Hooghly, West Bengal is a \r\nGraduated from Rabindra Bharati University, Kolkata. His paintings speak\r\n about the unexplained and unfound beauty of the objects. If an art can \r\nsing then his painting would do the singing of secrecy in beauty. \r\nAccording to him abstract art is the invisible soul in a painting which \r\nturns colours alive. He wants to rediscover the beauty in its most \r\nuncertain shapes. Unveiling the unexplored is the journey that he wanted\r\n to walk through.','1967-03-03','Hooghly, Kolkata','West Bengal','http://www.facebook.com','www.googleplus.com','www.twitter.com','www.pinterest.com',NULL,'India','Solo Exhibition','<ul><li> 1995 - Baggins Art Gallery, Kent, England</li><li> 2005 - Chemould Art Gallery, Kolkata</li><li> 2006 - Chemould Art Gallery, Kolkata</li></ul>\r\n								<h5><b>Participation</b></h5>\r\n								<ul><li> 1989 - Mid Summer Show Artist of West Bengal, Academy of Fine Arts, Kolkata</li><li> 1999 - Indian Society of Oriental Art, Kolkata</li><li> 2000 - â€œKalamelaâ€, Birla Academy of Art & Culture, Kolkata</li><li> 2000 â€“ â€œArt Accessâ€, Birla Academy of Art & Culture, Mumbai</li><li> 2010 - â€œKalamelaâ€ Academy of Fine Arts, Kolkata</li></ul>\r\n								<h5><b>Group Exhibition</b></h5>\r\n								<ul><li> 1989 - Mid Summer Show Artist of West Bengal, Academy of Fine Arts, Kolkata</li><li> 1999 - Indian Society of Oriental Art, Kolkata</li><li> 2000 - â€œKalamelaâ€, Birla Academy of Art & Culture, Kolkata</li><li> 2000 â€“ â€œArt Accessâ€, Birla Academy of Art & Culture, Mumbai</li><li> 2010 - â€œKalamelaâ€ Academy of Fine Arts, Kolkata</li><li> 1995	Academy of fine Arts Kolkata</li><li> 1996	Academy of fine Arts Kolkata</li><li> 1997	Academy of fine Arts Kolkata</li><li> 1999 - Academy of fine Arts Kolkata (March)</li><li> 1999	Academy of fine Arts Kolkata (September)</li><li> 2000 - Jahangir Art Gallery Mumbai</li><li> 2000 - Chemould Art Gallery Kolkata</li><li> 2000	Birla Academy of Art & Culture Kolkata</li><li> 2000	â€œArt Accessâ€ Birla Academy of Art and Culture Mumbai</li><li> 2001	Nehru Centre Art Gallery, Mumbai</li><li> 2002	Birla Academy of Art & Culture, Kolkata</li><li> 2004	Jahangir Art Gallery Mu Trebuchet Mumbai</li><li> 2004	Birla Academy of Art & Culture, Kolkata</li><li> 2005	Birla Academy of Art & Culture, Kolkata</li><li> 2005	Uma Devi Kejriwal Charitable Trust, Pune</li><li> 2006	Academy of fine Arts Kolkata</li><li> 2007.	Academy of fine Arts Kolkata</li><li> 2007	Birla Academy of Art & Culture, Kolkata</li><li> 2008	Birla Academy of Art & Culture, Kolkata</li><li> 2008	â€œMonsoon Showâ€ at Exposure Gallery, Kolkata</li><li> 2009	Academy of fine Arts Kolkata (January)</li><li> 2009	Academy of fine Arts Kolkata (November)</li><li> 2009	Hope Foundation, Gallery CafÃ©, Kolkata</li><li> 2010.	D.D.Niroy Art Gallery, Mumbai</li><li> 2010	Academy of fine Arts Kolkata</li><li> 2010	Jahangir Art Gallery Mumbai</li><li> 2011	Academy of fine Arts Kolkata</li><li> 2011	Chemould Art Gallery, Kolkata</li><li> 2011	Exhibition organized by Gallery Artist Circle in Singapore</li><li> 2012  	Exhibition organized by Exposure Art Gallery in Kolkata</li><li> 2012	Exhibition organized by Artic Vision in Mumbai</li><li> 2013	Academy of fine Arts, Kolkata</li><li> 2014 	Academy of fine Arts, Kolkata</li><li> 2015 	Academy of fine Arts, Kolkata</li><li> 2016 	Academy of fine Arts, Kolkata</li></ul>','Workshop','<ul><li>2011 - â€œNadir Sange Dekhaâ€, Kolkata</li><li> 2011 - Organized by Gallery Artist Circle, Kolkata</li><li> 2011 - Organized by Gallery Artist Circle, Shantiniketan</li><li> 2012 - Organized by Exposure Art Gallery, Darjeeling & Charcoal</li><li> 2014 - At shantiniketan â€œEparbangla Opar bangleâ€</li><li> 2014 - Kolkata</li><li> 2015 - Chandannagore</li><li> 2016 - HC Art Forum</li><li> 2017 - HC Art Forum</li></ul>\r\n								<h5><b>Collection</b></h5>\r\n								<ul><li> Paintings collected by private collectors,</li><li> Corporate Houses, Offices in India, U.K., Germany,</li><li> Japan, Belgium, Singapore & others Countries.</li></ul>','active','2017-08-04 16:17:40');

/*Table structure for table `banner` */

CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(150) DEFAULT NULL,
  `show_status` enum('active','inactive') DEFAULT 'active',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `banner` */

insert  into `banner`(`id`,`image`,`show_status`,`status`,`created_on`) values (1,'banner-1.jpg','active','active','2017-06-13 17:11:46');
insert  into `banner`(`id`,`image`,`show_status`,`status`,`created_on`) values (2,'banner-2.jpg','active','active','2017-06-13 17:11:52');
insert  into `banner`(`id`,`image`,`show_status`,`status`,`created_on`) values (3,'banner-3.jpg','active','active','2017-06-13 17:11:58');
insert  into `banner`(`id`,`image`,`show_status`,`status`,`created_on`) values (4,'banner-4.jpg','active','active','2017-06-13 17:12:11');
insert  into `banner`(`id`,`image`,`show_status`,`status`,`created_on`) values (14,'banner-5.jpg','active','active','2017-07-20 12:32:22');
insert  into `banner`(`id`,`image`,`show_status`,`status`,`created_on`) values (15,'banner-6.jpg','active','active','2017-07-20 15:28:26');
insert  into `banner`(`id`,`image`,`show_status`,`status`,`created_on`) values (16,'banner-7.jpg','active','active','2017-07-20 15:28:52');

/*Table structure for table `cart` */

CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `No_items` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cart` */

/*Table structure for table `category` */

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `description` text,
  `status` enum('active','inactive') NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `category` */

insert  into `category`(`id`,`name`,`description`,`status`,`createdOn`) values (1,'Acrylic','Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor print signed by the artist, Saatchi Art has over 370,000 original paintings','active','2017-05-30 09:56:49');
insert  into `category`(`id`,`name`,`description`,`status`,`createdOn`) values (3,'Oil','Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor print signed by the artist, Saatchi Art has over 370,000 original paintings','active','2017-05-30 09:57:16');
insert  into `category`(`id`,`name`,`description`,`status`,`createdOn`) values (4,'Charcoal','Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor print signed by the artist, Saatchi Art has over 370,000 original paintings','active','2017-05-30 09:57:16');
insert  into `category`(`id`,`name`,`description`,`status`,`createdOn`) values (5,'Canvas','Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor print signed by the artist, Saatchi Art has over 370,000 original paintings','active','2017-05-30 09:57:49');
insert  into `category`(`id`,`name`,`description`,`status`,`createdOn`) values (6,'Digital','Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor print signed by the artist, Saatchi Art has over 370,000,00 original paintings','active','2017-05-30 09:57:49');
insert  into `category`(`id`,`name`,`description`,`status`,`createdOn`) values (19,'Drawing','wild animals are dangerous animals compared to all','active','2017-07-20 12:10:08');

/*Table structure for table `contactus` */

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `contactus` */

insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (1,'xxx','xx@gmail.com','xxx','xxx dd','active','2017-07-28 15:43:52');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (3,'test','test@mailinator.com','test','test','active','2017-07-29 17:38:57');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (4,'test','test@mailinator.com','test','test','active','2017-07-29 17:39:17');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (5,'test','test@mailinator.com','test','test','active','2017-07-29 17:39:52');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (6,'test','test@mailinator.com','test','test','active','2017-07-29 17:40:21');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (7,'test','test@mailinator.com','test','test','active','2017-07-29 17:40:31');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (8,'test','test@mailinator.com','test','test','active','2017-07-29 17:40:42');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (9,'test','test@mailinator.com','test','test','active','2017-07-29 17:41:02');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (10,'test','test@mailinator.com','test','test','active','2017-07-29 17:41:11');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (11,'test','test@mailinator.com','test','test','active','2017-07-29 17:41:22');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (12,'test','test@mailinator.com','test','test','active','2017-07-29 17:41:33');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (13,'Sowmiya','sowmiya.r@mailinator.com','Technical English','test','active','2017-08-08 16:22:47');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (14,'raj kumar','rajkumar.0398.rk@gmail.com','test','test','active','2017-08-09 10:44:16');
insert  into `contactus`(`id`,`name`,`email`,`subject`,`message`,`status`,`createdOn`) values (15,'!@#$$%%~','rajkumar.0398.rk@gmail.com','test','test','active','2017-08-09 10:44:47');

/*Table structure for table `faq` */

CREATE TABLE `faq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` text,
  `answer` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `faq` */

insert  into `faq`(`id`,`question`,`answer`,`status`,`created_on`) values (3,'What\'s Artist profile?','Approved Artist can exhibit thir unique and exquiste artwork in paint Brush Webite','active','2017-07-06 16:56:05');
insert  into `faq`(`id`,`question`,`answer`,`status`,`created_on`) values (4,'How do I navigate the VayerArt Galleryâ€™s webpage to find artwork that I like?','You can start by browsing our online gallery using the general category tab on top of the home page (i.e. Paintings, Photography, etc.).\r\n    If you hover over the general categories you will see  down menus of more specific categories.\r\n    You can choose whichever category you like to view all artwork in that category.\r\n    You can choose a price range to narrow down your search.\r\n    If you are looking for a specific artist or a specific piece of artwork you can search for it using the Search bar on top of the page.\r\n    Once you find what you are looking for you can click on the image to view more details.\r\n    There you have the option to zoom in the image, view it in a room (places the artwork in a room setting to give perspective of size and look), add to favorites, or Price On Request.\r\n    You can also easily share the artwork with your friends by clicking on the conveniently placed social media icons.','active','2017-07-06 16:57:00');
insert  into `faq`(`id`,`question`,`answer`,`status`,`created_on`) values (5,'How can I contact VayerArt Gallery if I have more questions or comments?','E-mail us at connect@paintbrush.ae','active','2017-07-06 16:58:54');
insert  into `faq`(`id`,`question`,`answer`,`status`,`created_on`) values (6,'Is product get negotiate','yes,of course(testing).','active','2017-07-19 14:06:40');
insert  into `faq`(`id`,`question`,`answer`,`status`,`created_on`) values (7,'printable or not\r\n','yes,ofcourse\r\n','active','2017-07-20 12:32:49');

/*Table structure for table `favorite` */

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

/*Data for the table `favorite` */

insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (1,53,92,'active','2017-08-08 11:40:02');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (2,69,46,'active','2017-08-08 16:49:18');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (3,70,46,'active','2017-08-08 17:23:04');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (4,70,45,'active','2017-08-08 17:23:07');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (5,69,106,'inactive','2017-08-08 18:17:50');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (6,46,45,'active','2017-08-09 09:53:41');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (7,69,45,'active','2017-08-09 09:55:03');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (8,69,51,'active','2017-08-09 11:09:04');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (9,69,62,'active','2017-08-09 11:09:09');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (10,60,45,'inactive','2017-08-09 11:10:03');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (11,60,51,'inactive','2017-08-09 11:10:05');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (12,60,56,'inactive','2017-08-09 11:10:07');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (13,60,49,'active','2017-08-09 12:09:35');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (14,60,45,'inactive','2017-08-09 12:09:37');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (15,46,58,'active','2017-08-09 17:41:33');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (16,69,55,'active','2017-08-09 17:57:44');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (17,60,82,'active','2017-08-10 10:18:24');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (18,60,46,'inactive','2017-08-10 10:18:27');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (19,1,45,'inactive','2017-08-11 10:26:15');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (20,69,57,'active','2017-08-11 15:27:42');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (21,69,108,'active','2017-08-11 15:41:11');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (22,69,54,'active','2017-08-11 15:41:20');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (23,69,47,'active','2017-08-11 15:41:24');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (24,69,109,'active','2017-08-11 15:42:00');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (25,82,52,'active','2017-08-16 12:26:16');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (26,1,78,'active','2017-08-21 10:25:29');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (27,1,50,'inactive','2017-08-21 12:30:06');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (28,71,44,'inactive','2017-08-22 16:41:15');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (29,71,64,'inactive','2017-08-22 16:49:08');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (30,71,45,'inactive','2017-08-22 16:49:09');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (31,71,46,'inactive','2017-08-22 16:49:13');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (32,46,59,'active','2017-08-23 12:38:08');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (33,46,52,'active','2017-08-23 14:11:58');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (34,1,45,'inactive','2017-09-05 14:25:04');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (35,1,47,'active','2017-09-05 14:25:36');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (36,1,46,'inactive','2017-09-05 14:32:54');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (37,1,51,'active','2017-09-05 14:33:11');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (38,71,116,'active','2017-09-07 12:32:09');
insert  into `favorite`(`id`,`userid`,`productid`,`status`,`created_on`) values (39,82,57,'active','2017-09-27 15:23:00');

/*Table structure for table `newsletter` */

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `newsletter` */

insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (1,'chinjuharish@gmail.com','inactive','2017-07-14 11:33:03');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (2,'chinjuhariseh@gmail.com','inactive','2017-07-14 11:36:07');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (3,'chinjusharish@gmail.com','active','2017-07-10 11:54:10');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (4,'antony@gmail.com','active','2017-07-10 16:15:51');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (5,'balajee.95225@gmail.com','inactive','2017-08-04 14:30:39');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (6,'bala@mailinator.com','active','2017-07-14 14:49:12');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (7,'jan2345@mailinator.com','active','2017-07-20 15:21:05');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (8,'asfdhgh3@afsd.com','active','2017-07-20 17:49:23');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (9,'ytuytu@asdf.com','active','2017-07-20 18:41:05');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (10,'ytuytu@asdf.in','active','2017-07-20 18:41:18');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (11,'jan23@mailinator.com','active','2017-07-22 10:42:57');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (12,'fool@mailinator.com','active','2017-07-22 14:30:21');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (13,'sam4@gmail.com','active','2017-07-22 17:54:18');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (14,'jan455@mailiantor.com','active','2017-07-24 18:34:41');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (15,'masthanamma.k@m-tutor.com','active','2017-07-25 16:07:19');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (16,'muthu@xyz.com','active','2017-07-26 13:26:31');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (17,'testing@mailinator.com','active','2017-07-26 15:40:44');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (18,'muthu@xy.com','active','2017-07-27 16:06:01');
insert  into `newsletter`(`id`,`email`,`status`,`createdOn`) values (19,'rajkumar.0938.rk@gmail.com','active','2017-08-09 12:10:51');

/*Table structure for table `pagecontent` */

CREATE TABLE `pagecontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) DEFAULT NULL,
  `content` text,
  `status` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `pagecontent` */

insert  into `pagecontent`(`id`,`title`,`content`,`status`) values (1,'about','Our products allow businesses to be more reliable, flexible, and scalable. They help improve communication and make sense of massive amounts of data. Above all, they work together to help turn interactions into lasting relationships.','active');
insert  into `pagecontent`(`id`,`title`,`content`,`status`) values (2,'term','Your privacy is critically important to us. At Automattic, we have a few fundamental principles:\r\nWe don\'t ask you for personal information unless we truly need it. (We can\'t stand services that ask you for things like your gender or income level for no apparent reason.)\r\nWe don\'t share your personal information with anyone except to comply with the law, develop our products, or protect our rights.\r\nWe don\'t store personal information on our servers unless required for the ongoing operation of one of our services.\r\nIn our blogging products, we aim to make it as simple as possible for you to control what\'s visible to the public, seen by search engines, kept private, and permanently deleted.','active');
insert  into `pagecontent`(`id`,`title`,`content`,`status`) values (3,'privacy policy','Your privacy is critically important to us. At Automattic, we have a few fundamental principles:\r\nWe don\'t ask you for personal information unless we truly need it. (We can\'t stand services that ask you for things like your gender or income level for no apparent reason.)\r\nWe don\'t share your personal information with anyone except to comply with the law, develop our products, or protect our rights.\r\nWe don\'t store personal information on our servers unless required for the ongoing operation of one of our services.\r\nIn our blogging products, we aim to make it as simple as possible for you to control what\'s visible to the public, seen by search engines, kept private, and permanently deleted.','active');
insert  into `pagecontent`(`id`,`title`,`content`,`status`) values (4,'copy right policy','1.1 All capitalized terms not defined herein shall have such meanings as have been assigned to them respectively in the Terms. The rules of interpretation contained in the Terms shall also apply to this Privacy Policy. This Privacy Policy is at all times required to be read along with the Terms.\r\n\r\nSaatchi Art offers an unparalleled selection of paintings, drawings, sculpture and photography in a range of prices, and it provides artists from around the world with an expertly curated environment in which to exhibit and sell their work.\r\n\r\nBased in Los Angeles, Saatchi Art is redefining the experience of buying and selling art by making it easy, convenient and welcoming for both collectors and artists.','active');
insert  into `pagecontent`(`id`,`title`,`content`,`status`) values (5,'support','Our products allow businesses to be more reliable, flexible, and scalable. They help improve communication and make sense of massive amounts of data. Above all, they work together to help turn interactions into lasting relationships.','active');
insert  into `pagecontent`(`id`,`title`,`content`,`status`) values (6,'request status','Our products allow businesses to be more reliable, flexible, and scalable. They help improve communication and make sense of massive amounts of data. Above all, they work together to help turn interactions into lasting relationships.','active');
insert  into `pagecontent`(`id`,`title`,`content`,`status`) values (7,'testimonials','Window World (Rochester)\r\nI use Elixir Technologies Pvt. Ltd. for all of my offshore projects currently. Team is well qualified and have incredible level of professionalism. I\'d r\'ecommend them to anyone looking to expand in house capabilities with their very capable staff.\r\n\r\nWindow World Of Rochester\r\nI must say working with Elixir Technologies Pvt. Ltd. & his team has been a pleasure. They took some broken code done by an earlier Company, streamlined it, & added some improvements. The site is more professional and faster! Great Job! They get the job done and they do good work.\r\nConnection Graphics','active');

/*Table structure for table `pricerequest` */

CREATE TABLE `pricerequest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `mobileno` varchar(10) DEFAULT NULL,
  `emailid` varchar(100) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `message` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `pricerequest` */

insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (1,1,64,'TESTTESTTESTTE','3453453452','ajp@gmail.com','40\" X 50\"','asdf asdf sadf ','active','2017-08-22 14:59:01');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (2,1,64,'TESTTESTTESTTE','7856783546','ajp@gmail.com','40\" X 50\"','fdgsd dfg gfg','active','2017-08-22 14:59:37');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (3,1,64,'TESTTESTTESTTE','2342342341','ajp@gmail.com','40\" X 50\"','asdf asdf','active','2017-08-22 14:59:47');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (4,1,64,'TESTTESTTESTTE','4564564563','ajp@gmail.com','40\" X 50\"','sdfg sdg','active','2017-08-22 15:01:36');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (5,83,44,'Masthan','9884578439','hello55@mailinator.com','30\" X 36\"','testing1122','active','2017-08-22 16:42:27');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (6,83,134,'Masthan','9176716781','hello55@mailinator.com','60x30','testing','active','2017-08-22 17:49:58');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (7,83,134,'Masthan','9999988876','hello55@mailinator.com','60x30','testing1','active','2017-08-22 17:51:49');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (8,83,134,'Masthan','9999999999','hello55@mailinator.com','60x30','wretryrdtydtfgju','active','2017-08-22 17:52:43');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (9,1,58,'TESTTESTTESTTE','7890789067','ajp@gmail.com','47\" X 38\"','sdalf asldfkj','active','2017-08-23 10:25:24');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (10,46,45,'Sappanimuthu','9566490453','muthu@xyz.com','30\" X 36\"','test','active','2017-08-23 11:55:35');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (11,46,46,'Sappanimuthu','9566490453','muthu@xyz.com','1000\" X 1000\"','test','active','2017-08-23 12:09:04');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (12,46,46,'Sappanimuthu','9566490453','sam@mailinator.com','','test','active','2017-08-23 12:13:21');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (13,46,45,'Sappanimuthu','9566490453','muthu@xyz.com','1000\" X 1000\"','test','active','2017-08-23 12:14:31');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (14,46,45,'Sappanimuthu','9566490453','muthu@xyz.com','','TEST','active','2017-08-23 12:15:01');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (15,60,44,'raj kumar','9677645170','rajkumar.0398.rk@gmail.com','3          3               3          3         4','test','active','2017-08-23 12:16:09');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (16,71,62,'Manohar','9791257708','manoharrpm20@gmail.com','40\" X 50\"','HI','active','2017-09-07 12:30:24');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (17,82,57,'Radhika R','9566026291','radhikaraju.n@gmail.com','24\" x 24\"','Hi, request price for the selected item...','active','2017-09-27 15:22:54');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (18,82,60,'Radhika R','9566026291','radhikaraju.n@gmail.com','47\" X 38\"','Need Price ','active','2017-10-30 15:43:50');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (19,82,46,'Radhika R','9566026291','radhikaraju.n@gmail.com','36\" X 36\"','request','active','2017-10-30 16:01:22');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (20,82,44,'Radhika R','9566026291','radhikaraju.n@gmail.com','30\" X 36\"','price','active','2017-10-30 16:10:46');
insert  into `pricerequest`(`id`,`userid`,`productid`,`name`,`mobileno`,`emailid`,`size`,`message`,`status`,`createdOn`) values (21,82,44,'Radhika R','9566026291','radhikaraju.n@gmail.com','30\" X 36\"','price','active','2017-10-30 16:12:02');

/*Table structure for table `printsize` */

CREATE TABLE `printsize` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productid` int(11) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `type` enum('paper','canvas') DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `printsize` */

insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (1,136,'30x40','canvas','inactive','2017-08-23 16:18:59');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (2,136,'30x10','paper','inactive','2017-08-23 16:18:59');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (3,136,'30x40','canvas','inactive','2017-08-23 16:26:36');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (4,136,'30x10','paper','inactive','2017-08-23 16:26:36');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (5,136,'30x40','canvas','inactive','2017-08-23 16:28:33');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (6,136,'30x10','paper','inactive','2017-08-23 16:28:33');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (7,136,'30x40','canvas','inactive','2017-08-23 16:28:51');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (8,136,'30x10','paper','inactive','2017-08-23 16:28:51');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (9,136,'30x40','canvas','inactive','2017-08-23 16:31:09');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (10,136,'30x10','paper','inactive','2017-08-23 16:31:09');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (11,136,'30x40','canvas','inactive','2017-08-23 16:32:31');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (12,136,'30x10','paper','inactive','2017-08-23 16:32:31');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (13,136,'30x40','canvas','inactive','2017-08-23 16:40:04');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (14,136,'30x10','paper','inactive','2017-08-23 16:40:04');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (15,136,'30x40','canvas','active','2017-08-23 16:41:37');
insert  into `printsize`(`id`,`productid`,`size`,`type`,`status`,`createdOn`) values (16,136,'30x10','paper','active','2017-08-23 16:41:37');

/*Table structure for table `product` */

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) NOT NULL,
  `artistid` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(75) NOT NULL,
  `description` text,
  `quantity` int(11) DEFAULT NULL,
  `artType` varchar(50) NOT NULL,
  `artSize` varchar(50) NOT NULL,
  `size` varchar(10) NOT NULL,
  `thumbImage` varchar(250) NOT NULL,
  `style` varchar(50) NOT NULL,
  `image` varchar(250) NOT NULL,
  `videoImage` varchar(250) DEFAULT NULL,
  `printable` enum('yes','no') NOT NULL DEFAULT 'no',
  `featured` enum('yes','no') DEFAULT 'no',
  `new_status` int(11) DEFAULT NULL,
  `noOfViews` int(11) NOT NULL,
  `noOfFavourite` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (44,1,1,'AM01-CS-001','CITY SCAPE','CITY SCAPE',1,'Acrylic on canvas','medium','30\" X 36\"','2017080416330815.jpg','1','2017080416330815.jpg','','no','yes',NULL,1039,0,'active','2017-08-04 16:33:08');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (45,1,1,'AM01-LS-001','LANDSCAPE 1','LANDSCAPE 1',1,'Acrylic on canvas','medium','30\" X 36\"','2017080416394216.jpg','2','2017080416394216.jpg','','no','yes',NULL,1036,0,'active','2017-08-04 16:39:42');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (46,1,1,'AM01-LS-011','LANDSCAPE 11','LANDSCAPE 11',1,'Acrylic on canvas','medium','36\" X 36\"','2017080416475417.jpg','3','2017080416475417.jpg','','no','yes',NULL,1033,0,'active','2017-08-04 16:47:54');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (47,1,1,'AM01-BM-001','BANDMASTER 1','BANDMASTER 1\r\n',1,'Acrylic on canvas','medium','54\" X44\"','2017080416511218.jpg','3','2017080416511218.jpg','','yes','yes',NULL,1033,0,'active','2017-08-04 16:51:12');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (48,1,1,'AM01-BM-002','BANDMASTER 2','BANDMASTER 2',1,'Acrylic on canvas','medium','54\" X44\"','2017080416542619.jpg','4','2017080416542619.jpg','','no','no',NULL,1032,0,'active','2017-08-04 16:54:26');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (49,5,1,'AM01-BM-003','BANDMASTER 3','BANDMASTER 3',1,'Acrylic on canvas','medium','54\" X44\"','2017080416571014.jpg','5','2017080416571014.jpg','','no','no',NULL,1032,0,'active','2017-08-04 16:57:10');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (50,5,1,'AM01-BM-004','BANDMASTER 4','BANDMASTER 4',1,'Acrylic on canvas','large','36\" X 30\"','2017080416591515.jpg','6','2017080416591515.jpg','','no','no',1,1031,0,'active','2017-08-04 16:59:15');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (51,1,3,'DD01-Comp-001','Composition 1','The feminine beauty showing no fear but elegance with the beast, bringing out expression and nature',1,'Acrylic on canvas','medium','30\" X 40\"','2017080710264801.jpg','6','2017080710264801.jpg','','no','no',0,965,0,'active','2017-08-07 10:26:48');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (52,1,3,'DD01-Comp-002','Composition 2','The inner beauty of the women and their guise defines the world how beautiful is the nature.',1,'Acrylic on canvas','medium','24\" x 24\"','2017080710291702.jpg','7','2017080710291702.jpg','','no','yes',0,964,0,'active','2017-08-07 10:29:17');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (53,1,3,'DD01-Comp-003','Composition 3','Lady with beautiful expression as alluring as a peacock with vibrant colour of art.',1,'Acrylic on canvas','medium','24\" x 24\"','2017080710311903.jpg','9','2017080710311903.jpg','','no','no',1,964,0,'active','2017-08-07 10:31:19');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (54,1,3,'DD01-Comp-004','Composition 4','Art is a form of expression which showcases the elements of beauty and nature with vibrant colours and combinations, this painting is one of a kind which speaks about the unique nature of women.',1,'Acrylic on canvas','medium','24\" x 24\"','2017080710323804.jpg','9','2017080710323804.jpg','','no','yes',0,964,0,'active','2017-08-07 10:32:38');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (55,1,3,'DD01-Comp-005','Composition 5','Mesmerising is Krishnaâ€™s flute and his art of playing it.',1,'Acrylic on canvas','large','24\" x 24\"','2017080710334505.jpg','1','2017080710334505.jpg','','no','yes',0,964,0,'active','2017-08-07 10:33:45');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (56,1,3,'DD01-Comp-006','Composition 6','Radha and Krishna with the enchanting music of love.',1,'Acrylic on canvas','medium','24\" x 24\"','2017080710351806.jpg','7','2017080710351806.jpg','','yes','yes',0,964,0,'active','2017-08-07 10:35:18');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (57,1,3,'DD01-Comp-007','Composition 7','Radha and Krishna in divine super reality with his flute, love and nature.',1,'Acrylic on canvas','medium','24\" x 24\"','2017080710364507.jpg','2','2017080710364507.jpg','','no','no',1,964,0,'active','2017-08-07 10:36:45');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (58,3,4,'PB03-HW-001','Happy Within 1','Happy Within 1',1,'Oil On canvas','large','47\" X 38\"','2017080710402504.jpg','1','2017080710402504.jpg','','no','yes',1,964,0,'active','2017-08-07 10:40:25');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (59,3,4,'PB03-HW-002','Happy Within 2','Happy Within 2',1,'Oil On canvas','medium','34\" X 32\"','2017080710473005.jpg','2','2017080710473005.jpg','','no','no',NULL,964,0,'active','2017-08-07 10:47:30');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (60,3,4,'PB03-HW-003','Happy Within 3','Happy Within 3',1,'Oil On canvas','medium','47\" X 38\"','2017080710492106.jpg','5','2017080710492106.jpg','','no','no',NULL,964,0,'active','2017-08-07 10:49:21');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (61,1,5,'PB03-PS-004','Women 1','Women 1\r\n',1,'Acrylic on canvas','medium','30\" X 30\"','2017080711093311.jpg','3','2017080711093311.jpg','','no','no',0,963,0,'active','2017-08-07 11:09:33');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (62,1,5,'SK04-WN-002','Women 2','Women 2',1,'Acrylic on canvas','medium','40\" X 50\"','2017080711105812.jpg','8','2017080711105812.jpg','','no','no',NULL,963,0,'active','2017-08-07 11:10:58');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (63,1,5,'SK04-IW-003','Indian Women','Indian Women',1,'Acrylic on canvas','medium','40\" X 50\"','2017080711123113.jpg','9','2017080711123113.jpg','','no','no',NULL,963,0,'active','2017-08-07 11:12:31');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (64,1,5,'SK04-WN-004','Women 3','Women 3',1,'Acrylic on canvas','medium','40\" X 50\"','2017080711134814.jpg','3','2017080711134814.jpg','','no','no',NULL,963,0,'active','2017-08-07 11:13:48');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (65,1,6,'SM05-AD-001','Autodriver1','Autodriver1',1,'Oil on Acrylic','medium','36\" X 36\"','2017080711205701.jpg','8','2017080711205701.jpg','','no','no',NULL,962,0,'active','2017-08-07 11:20:57');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (66,3,6,'SM05-AD-002','Autodriver2','Autodriver2',1,'Oil on Acrylic','medium','36\" X 36\"','2017080711223802.jpg','5','2017080711223802.jpg','','no','no',NULL,962,0,'active','2017-08-07 11:22:38');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (67,3,6,'SM05-AD-003','Autodriver3','Autodriver3',1,'Oil on Acrylic','medium','36\" X 36\"','2017080711234803.jpg','8','2017080711234803.jpg','','no','no',NULL,962,0,'active','2017-08-07 11:23:48');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (68,1,7,'SD06-TL-001','Tune of Love1','The poetic representation of love between Radha and Krishna is beautifully said in the art form with emotions dwelling in the facial expressions',1,'Acrylic on canvas','medium','36\" X 36\"','2017080711300908.jpg','8','2017080711300908.jpg','','no','no',0,961,0,'active','2017-08-07 11:30:09');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (69,1,7,'SD06-TL-002','Couple','The artist has depicted the characters from Indian mythology by focusing on the divine love of Radha and Krishna with a beautiful flora and fauna elements with flute being the motif for the art.',1,'Acrylic on canvas','medium','40\" X 30\"','2017080711323109.jpg','2','2017080711323109.jpg','','no','yes',0,961,0,'active','2017-08-07 11:32:31');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (70,1,7,'SD06-TL-003','Tune of Love 2','The art with a traditional and ethnic touch of modern, realistic expression giving a surreal mood to the painting is the speciality of the artist.',1,'Acrylic on canvas','medium','30\" X 30\"','2017080711374310.jpg','5','2017080711374310.jpg','','no','no',0,960,0,'active','2017-08-07 11:37:43');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (71,5,8,'PN07-FES-001','Festival','Festival',1,'Mixed on Canvas','medium','20\" X 30\"','2017080711513401.jpg','6','2017080711513401.jpg','','no','no',NULL,954,0,'active','2017-08-07 11:51:34');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (72,1,8,'PN07-LS-002','Landscape1-In the Woods','Landscape1-In the Woods',1,'Acrylic on canvas and wood','large','46\"X40\"','2017080711530902.jpg','2','2017080711530902.jpg','','no','no',NULL,954,0,'active','2017-08-07 11:53:09');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (73,5,8,'PN07-LS-003','Landscape 2-Deep Into Nature','Landscape 2-Deep Into Nature',1,'Mixed on Board','small','16\"X12\"','2017080711561703.jpg','5','2017080711561703.jpg','','no','no',NULL,954,0,'active','2017-08-07 11:56:17');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (74,5,8,'PN07-LS-004','Landscape 3 ','Landscape 3 ',1,'Mixed on Canvas','small','12\"X10\"','2017080711575504.jpg','9','2017080711575504.jpg','','no','no',NULL,954,0,'active','2017-08-07 11:57:55');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (75,5,8,'PN07-LS-005','Landscape 4','Landscape 4',1,'Mixed on Canvas','small','12\"X10\"','2017080711594205.jpg','8','2017080711594205.jpg','','no','no',NULL,954,0,'active','2017-08-07 11:59:42');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (76,5,8,'PN07-LS-006','Landscape 5','Landscape 5',1,'Mixed on Canvas','small','14\"X15\"','2017080712045706.jpg','3','2017080712045706.jpg','','no','no',NULL,954,0,'active','2017-08-07 12:04:57');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (77,5,8,'PN07-LS-007','Landscape 6','Landscape 6',1,'Mixed on Canvas','small','18\"X20\"','2017080712055607.jpg','8','2017080712055607.jpg','','no','no',NULL,954,0,'active','2017-08-07 12:05:56');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (78,5,8,'PN07-LS-008','Landscape 7','Landscape 7',1,'Mixed on Canvas','small','18\"X16\" ','2017080712075208.jpg','7','2017080712075208.jpg','','no','no',1,954,0,'active','2017-08-07 12:07:52');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (79,5,8,'PN07-BL-009','Baul I','Baul I',1,'Mixed Medium','medium','22\"X14\"','2017080712122509.jpg','5','2017080712122509.jpg','','no','no',NULL,954,0,'active','2017-08-07 12:12:25');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (80,5,8,'PN07-BL-010','Baul II','Baul II',1,'Mixed Medium','medium','22\"X14\"','2017080712133810.jpg','8','2017080712133810.jpg','','no','no',NULL,954,0,'active','2017-08-07 12:13:38');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (81,5,8,'PN07-TW-011','The Women I','The Women I',1,'Mixed Medium','small','14\"X22\"','2017080712151811.jpg','7','2017080712151811.jpg','','no','no',NULL,954,0,'active','2017-08-07 12:15:18');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (82,5,8,'PN07-TW-012','The Women II','The Women II\r\n',1,'Mixed Medium','medium','22\"X14\"','2017080712165212.jpg','3','2017080712165212.jpg','','no','no',NULL,954,0,'active','2017-08-07 12:16:52');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (83,5,8,'PN07-SS-013','Seascape - Forbidden Sea','Seascape - Forbidden Sea',1,'Mixed on Canvas','medium','30\"X36\"','2017080712191213.jpg','3','2017080712191213.jpg','','no','no',1,954,0,'active','2017-08-07 12:19:12');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (84,1,1,'CB_LONO_1','Lono 1','Lono 1',0,'Acrylic on canvas','medium','30\" X 28','20170807143227sold01.png','7','20170807143227sold01.png','','no','no',NULL,949,0,'active','2017-08-07 14:32:27');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (85,1,3,'M-001','Meditation','Meditation',0,'Acrylic on canvas','medium','30\" X 28\"','20170807145141sold_01.jpg','4','20170807145141sold_01.jpg','','no','no',NULL,948,0,'active','2017-08-07 14:51:41');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (86,3,4,'W-A-1','Women Art 1','Women Art 1',0,'Oil On canvas','medium','34\" X 32','20170807145441sold_01.jpg','3','20170807145441sold_01.jpg','','no','no',NULL,948,0,'active','2017-08-07 14:54:41');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (87,1,5,'GC-001','God in Child','God in Child',0,'Acrylic on canvas','medium','30\" X 28\"','20170807150004sold_01.jpg','2','20170807150004sold_01.jpg','','no','no',NULL,948,0,'active','2017-08-07 15:00:04');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (88,1,6,'WT-001','With Tablea 1','With Tablea 1',0,'Acrylic on canvas','medium','30\" X 28\"','20170807150231sold_01.jpg','3','20170807150231sold_01.jpg','','no','no',NULL,948,0,'active','2017-08-07 15:02:31');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (89,1,7,'DV-0011','Divinity 1','Divinity 1',0,'Watercolor on Paper','medium','30\" X 29\"','20170807150522sold_01.jpg','8','20170807150522sold_01.jpg','','no','no',NULL,948,0,'active','2017-08-07 15:05:22');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (90,1,8,'NV-001','Naturals I','Naturals I',0,'Acrylic on canvas and wood','large','46\"X40\"','20170807150818sold_01.jpg','5','20170807150818sold_01.jpg','','no','no',NULL,948,0,'active','2017-08-07 15:08:18');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (91,5,7,'DI - 002','Divinity 2','Divinity 2',0,'Oil On canvas','medium','20\" X 30\"','20170808105348sold_02.jpg','7','20170808105348sold_02.jpg','','no','no',0,933,0,'active','2017-08-08 10:53:48');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (92,19,5,'DI - 003','Divinity 3','Divinity 3',0,'Mixed Medium','medium','24\" x 24\"','20170808112220sold_02.jpg','8','20170808112220sold_02.jpg','','no','no',0,933,0,'active','2017-08-08 11:22:20');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (93,6,8,'NS - 001','Naturals II','Naturals II',0,'Digital Canvas','medium','30\" X 28\"','20170808114423sold_02.jpg','8','20170808114423sold_02.jpg','','no','no',0,928,0,'active','2017-08-08 11:44:23');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (94,6,1,'CB_LONO_2','Lono 2','Lono 2',0,'Mixed Medium','medium','24\" x 24\"','20170808115403sold02.jpg','6','20170808115403sold02.jpg','','no','no',0,928,0,'active','2017-08-08 11:54:03');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (95,4,3,'GA-001','God Alone','God Alone',0,'Mixed Medium','medium','30\" X 28\"','20170808115741sold_02.jpg','4','20170808115741sold_02.jpg','','no','no',0,928,0,'active','2017-08-08 11:57:41');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (96,4,4,'Dp - 001','Divine Peace','Divine Peace',0,'Mixed Medium','medium','24\" x 24\"','20170808120012sold_03.jpg','3','20170808120012sold_03.jpg','','no','no',0,928,0,'active','2017-08-08 12:00:12');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (97,19,6,'WD-02','With Guitar','With Guitar',0,'Mixed on Canvas','medium','24\" x 24\"','20170808120705sold_02.jpg','2','20170808120705sold_02.jpg','','no','no',0,928,0,'active','2017-08-08 12:07:05');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (98,4,1,'CB_LONO_3','Lono 3','Lono 3',0,'Mixed Medium','small','24\" x 24\"','20170808124421sold03.jpg','9','20170808124421sold03.jpg','','no','no',0,925,0,'active','2017-08-08 12:44:21');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (99,6,3,'M-002','Monks','Monks',0,'Mixed Medium','medium','24\" x 24\"','20170808124645sold_03.jpg','1','20170808124645sold_03.jpg','','no','no',0,925,0,'active','2017-08-08 12:46:45');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (100,6,4,'DF-001','Devotional Flute','Devotional Flute',0,'Mixed Medium','medium','24\" x 24\"','20170808124851sold_04.jpg','2','20170808124851sold_04.jpg','','no','no',0,925,0,'active','2017-08-08 12:48:51');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (101,4,5,'S-001','Solar','Solar',0,'Mixed Medium','medium','24\" x 24\"','20170808125051sold_03.jpg','3','20170808125051sold_03.jpg','','no','no',0,925,0,'active','2017-08-08 12:50:51');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (102,5,6,'WL-001','With Lamb','With Lamb',0,'Mixed Medium','medium','24\" x 24\"','20170808125243sold_03.jpg','4','20170808125243sold_03.jpg','','no','no',0,924,0,'active','2017-08-08 12:52:43');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (103,6,7,'DI - 004','Divinity 4','Divinity 4',0,'Mixed Medium','medium','24\" x 24\"','20170808125428sold_03.jpg','5','20170808125428sold_03.jpg','','no','no',0,924,0,'active','2017-08-08 12:54:28');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (104,19,8,'NS - 004','Naturals IV','Naturals IV',0,'Mixed Medium','medium','24\" x 24\"','20170808125628sold_03.jpg','7','20170808125628sold_03.jpg','','no','no',0,924,0,'active','2017-08-08 12:56:28');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (111,19,1,'Lono-4','Lono 4','Lono-4',0,'Acrylic on canvas','medium','54\" X 44\"','20170822121602sold04.jpg','7','20170822121602sold04.jpg','','no','no',0,183,0,'active','2017-08-22 12:16:02');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (112,1,1,'Lono_5','Lono 5','Lono 5',0,'Acrylic on canvas','medium','54\" X44\"','20170822122043sold06.jpg','9','20170822122043sold06.jpg','','no','no',0,182,0,'active','2017-08-22 12:20:43');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (113,1,1,'Lono_6','Lono 6','Lono 6',0,'Acrylic on canvas','medium','30\" X 36\"','20170822122228sold08.jpg','4','20170822122228sold08.jpg','','no','no',0,182,0,'active','2017-08-22 12:22:28');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (114,3,4,'ww-1','Women In Window','Women In Window',0,'Oil On canvas','medium','34\" X 32','20170822123817sold_02.jpg','3','20170822123817sold_02.jpg','','no','no',0,182,0,'active','2017-08-22 12:38:17');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (115,3,4,'GOD-001','God With Anger','God With Anger',0,'Oil On canvas','medium','34\" X 32','20170822124051sold_05.jpg','1','20170822124051sold_05.jpg','','no','no',0,181,0,'active','2017-08-22 12:40:51');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (116,3,4,'TW-1','Two Women','Two Women',0,'Oil On canvas','medium','34\" X 32\"','20170822124651sold_06.jpg','2','20170822124651sold_06.jpg','','no','no',0,181,0,'active','2017-08-22 12:46:51');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (117,3,4,'SL-01','Single Lady','Single Lady',0,'Oil On canvas','medium','34\" X 32\"','20170822124818sold_07.jpg','2','20170822124818sold_07.jpg','','no','no',0,180,0,'active','2017-08-22 12:48:18');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (118,1,3,'ww-2','Women 4','Women 4',0,'Acrylic on canvas','medium','30\" X 28\"','20170822125148sold_04.jpg','3','20170822125148sold_04.jpg','','no','no',0,180,0,'active','2017-08-22 12:51:48');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (119,1,3,'D-12','Devotion','Devotion',0,'Acrylic on canvas','medium','30\" X 28\"','20170822125303sold_05.jpg','4','20170822125303sold_05.jpg','','no','no',0,180,0,'active','2017-08-22 12:53:03');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (120,1,3,'Lord-002','Lord','Lord',0,'Acrylic on canvas','medium','30\" X 28\"','20170822125420sold_06.jpg','5','20170822125420sold_06.jpg','','no','no',0,180,0,'active','2017-08-22 12:54:20');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (121,1,5,'GB-01','Green Boy','Green Boy',0,'Acrylic on canvas','medium','30\" X 28\"','20170822142004sold_04.jpg','5','20170822142004sold_04.jpg','','no','no',0,180,0,'active','2017-08-22 14:20:04');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (122,1,5,'GL-01','Gorgeous Lady','Gorgeous Lady',0,'Acrylic on canvas','medium','30\" X 28\"','20170822142114sold_05.jpg','6','20170822142114sold_05.jpg','','no','no',0,180,0,'active','2017-08-22 14:21:14');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (123,1,5,'SL-02','Sad Lady','Sad Lady',0,'Acrylic on canvas','medium','30\" X 28\"','20170822142335sold_06.jpg','6','20170822142335sold_06.jpg','','no','no',0,179,0,'active','2017-08-22 14:23:35');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (124,1,8,'F-01','Fire','Fire',0,'Acrylic on canvas and wood','medium','46\"X40\"','20170822142934sold_04.jpg','9','20170822142934sold_04.jpg','','no','no',0,179,0,'active','2017-08-22 14:29:34');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (125,1,8,'F-02','Fire 2','Fire 2',0,'Acrylic on canvas and wood','medium','46\"X40\"','20170822143041sold_05.jpg','7','20170822143041sold_05.jpg','','no','no',0,179,0,'active','2017-08-22 14:30:41');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (126,1,8,'F-03','Fire 3','Fire 3',0,'Acrylic on canvas and wood','medium','46\"X40\"','20170822143142sold_06.jpg','8','20170822143142sold_06.jpg','','no','no',0,179,0,'active','2017-08-22 14:31:42');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (127,1,8,'F-04','Fire 4','Fire 4',0,'Acrylic on canvas and wood','medium','46\"X40\"','20170822143232sold_07.jpg','4','20170822143232sold_07.jpg','','no','no',0,179,0,'active','2017-08-22 14:32:32');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (128,1,6,'WG-01','With Gadam','With Gadam',0,'Acrylic on canvas','medium','30\" X 28\"','20170822143609sold_04.jpg','5','20170822143609sold_04.jpg','','no','no',0,179,0,'active','2017-08-22 14:36:09');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (129,1,6,'wp-01','With Photo','With Photo',0,'Acrylic on canvas','medium','30\" X 28\"','20170822144047sold_05.jpg','8','20170822144047sold_05.jpg','','no','no',0,179,0,'active','2017-08-22 14:40:47');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (130,1,6,'WL-01','With Lamb 2','With Lamb 2',0,'Acrylic on canvas','medium','30\" X 28\"','20170822144145sold_06.jpg','3','20170822144145sold_06.jpg','','no','no',0,179,0,'active','2017-08-22 14:41:45');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (131,19,7,'PN07-003','Blue Lady with violin','Blue Lady with violin',0,'painting','medium','30\" X 28\"','20170822144452sold_04.jpg','5','20170822144452sold_04.jpg','','no','no',0,179,0,'active','2017-08-22 14:44:52');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (132,19,7,'Face-1','Face-1','Face-1',0,'painting','medium','30\" X 28\"','20170822144615sold_05.jpg','7','20170822144615sold_05.jpg','','no','no',0,179,0,'active','2017-08-22 14:46:15');
insert  into `product`(`id`,`categoryid`,`artistid`,`code`,`name`,`description`,`quantity`,`artType`,`artSize`,`size`,`thumbImage`,`style`,`image`,`videoImage`,`printable`,`featured`,`new_status`,`noOfViews`,`noOfFavourite`,`status`,`createdOn`) values (133,5,7,'T-01','Thyanam','Thyanam',0,'painting','medium','30\" X 28\"','20170822144721sold_06.jpg','6','20170822144721sold_06.jpg','','no','no',0,178,0,'active','2017-08-22 14:47:21');

/*Table structure for table `shippingaddress` */

CREATE TABLE `shippingaddress` (
  `userid` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `addr1` varchar(100) DEFAULT NULL,
  `addr2` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `shippingaddress` */

insert  into `shippingaddress`(`userid`,`name`,`addr1`,`addr2`,`city`,`pincode`,`status`,`createdOn`) values (1,'aa1','cc1','cc1','dd1','ff1','active','2017-09-05 11:19:29');
insert  into `shippingaddress`(`userid`,`name`,`addr1`,`addr2`,`city`,`pincode`,`status`,`createdOn`) values (71,'R Manohar','1259 TNHB colony','Velachery','Chennai','600042','active','2017-09-07 12:15:49');

/*Table structure for table `style` */

CREATE TABLE `style` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `style` */

insert  into `style`(`id`,`name`,`status`) values (1,'Abstract','active');
insert  into `style`(`id`,`name`,`status`) values (2,'Art Deco','active');
insert  into `style`(`id`,`name`,`status`) values (3,'Conceptual','active');
insert  into `style`(`id`,`name`,`status`) values (4,'Cubism','active');
insert  into `style`(`id`,`name`,`status`) values (5,'Documentary','active');
insert  into `style`(`id`,`name`,`status`) values (6,'Expressionism','active');
insert  into `style`(`id`,`name`,`status`) values (7,'Figurative','active');
insert  into `style`(`id`,`name`,`status`) values (8,'Fine Art','active');
insert  into `style`(`id`,`name`,`status`) values (9,'Illustration','active');

/*Table structure for table `users` */

CREATE TABLE `users` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emailid` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profileImage` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive') COLLATE utf8_unicode_ci DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (1,'TESTTESTTESTTE','ajp@gmail.com','1427848522antony.jpg','test','2017-06-07 15:30:01','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (2,'test1','test@gmail.com','866986869_science.png','test1','2017-06-12 10:39:30','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (3,'kumar','kumar@gmail.com',NULL,'kumar','2017-06-12 10:40:05','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (17,'balaji','balaji@maillinator.com','152010071Base-Jumping-Extreme-Sports-1366x768.jpg','','2017-07-13 16:12:01','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (18,'bala','bala@maillinator.com','1017064992hill_lake_sunset_trees_97141_1366x768.jpg','test12345','2017-07-13 17:05:51','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (19,'kanimozhi','mtutor005@gmail.com',NULL,'testcase23','2017-07-14 16:51:26','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (20,'jananishiva','hello22@mailinator.com','14768681581 _Link.png','testcase22','2017-07-15 15:52:16','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (21,'janani','jan22@mailinator.com',NULL,'','2017-07-15 15:58:47','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (22,'janani','jan23@mailinator.com','125671039main content 1.png','','2017-07-15 16:27:09','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (23,'janani','kani23@mailinator.com',NULL,'','2017-07-15 16:53:00','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (24,'test','jan23@mailinator.com','1239245556stock-photo-cute-baby-looking-out-from-under-blanket-90635998.jpg','testcase23','2017-07-15 16:53:37','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (25,'','',NULL,'testcase23','2017-07-15 17:11:06','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (26,'','',NULL,'f','2017-07-17 17:20:14','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (27,'f','f1@mailinator.com',NULL,'','2017-07-17 18:54:36','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (28,'one','one@mailinator.com','2111223818subscribepage.jpg','abc','2017-07-17 18:55:28','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (29,'','',NULL,'testcase23','2017-07-18 11:24:29','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (30,'hjkhkl','jhjk@asdf.com',NULL,'askdf','2017-07-18 18:15:56','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (34,'adfdf','antony@gmoiail.com',NULL,'test','2017-07-18 19:10:04','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (35,'janani','janani23royal@gmail.com',NULL,'sssss','2017-07-19 09:44:26','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (36,'test','jack@mailinator.com','33009021doll.jpg','janani','2017-07-19 09:48:55','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (37,'antony','antonsdfd@asdflk.com',NULL,'sdfkjkjkj','2017-07-19 19:26:06','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (38,'kanimozhi','kanimozhi.s@m-tutor.com','330944598stock-photo-cute-baby-looking-out-from-under-blanket-90635998.jpg','testcase23','2017-07-20 12:14:55','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (39,'sam','samkumar5000@mailinator.com','1541483789small_lion.png','test1234','2017-07-20 12:40:02','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (40,'xxx','xxx@xxx.com',NULL,'test','2017-07-20 18:45:34','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (41,'kumar','kumars@gmail.com','12373920710_science.png','kumar','2017-07-21 10:37:06','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (42,'janani','ja23@mailinator.com',NULL,'janani','2017-07-22 10:55:24','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (43,'Masthan','masthanamma.k@m-tutor.com','1237001870Tulips.jpg','test1234','2017-07-25 16:02:47','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (44,'Kaikondar Kaikondar Kaikondar Kaikondar Kaikondar Kaikondar Kaiko','Kaikondartestingteamannanagarwest@mailinator.com','16352913351.jpg','1','2017-07-26 11:30:55','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (45,'Kaikondar','testing@mailinator.com',NULL,'test1234','2017-07-26 11:53:34','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (46,'Sappanimuthu','muthu@xyz.com','1466008289pwd.xlsx','muthu','2017-07-26 12:05:04','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (47,'#$@','testing1@mailinator.com',NULL,'test1234','2017-07-26 12:07:24','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (48,'Kaikondar','test@mailinator.com',NULL,'8','2017-07-26 18:57:19','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (49,'k','nice25@mailinator.com',NULL,'testcase23','2017-07-27 14:29:24','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (50,'afkein','afkeinraj@m-tutor.com',NULL,'test1234','2017-07-27 15:19:07','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (51,'Mtutor','mtutor@mtutor.com','1132724773client-2.jpg','123456','2017-07-27 18:55:56','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (52,'dfd','a@gmail.com',NULL,'kjk','2017-07-28 14:49:57','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (53,'asdf asdfl asdf asfdj asldfkj','admin@symbioticinfo','1244823345Penguins.jpg','password','2017-07-28 16:46:44','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (54,'adf -','asdf@asdf.com',NULL,'lkjlas','2017-07-28 16:48:37','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (55,'J. Antony Jeyaprakash','dher@m-tutor.com',NULL,'test234','2017-07-28 16:49:41','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (56,'Masthan','a@m-tutor.com',NULL,'test1234','2017-07-29 17:14:36','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (57,'Kaikondar.s','testing001@mailinator.com',NULL,'test1234','2017-07-29 17:15:33','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (58,'TestingTestingTestingTestingT','test1@xyz.com',NULL,'test1@xyz.com','2017-07-29 17:24:20','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (59,'kanimozhikanimozhikanimozhikan','mail@mailinator.com',NULL,'testcase23','2017-07-31 15:33:49','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (60,'raj kumar','rajkumar.0398.rk@gmail.com','430131272images.jpg','9677645170','2017-07-31 15:50:33','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (61,'TESTTESTTESTTEST','rajkumar.0398.rk@gmai.com',NULL,'rajkumar.0398.rk@gmai.com','2017-07-31 19:11:14','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (62,'raj kumarraj kumarraj kumarraj','rajkumar.a@m-tutor.com',NULL,'9677645170','2017-08-01 14:48:34','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (63,'Vijay','paintbrush@mailinator.com',NULL,'password','2017-08-02 11:50:54','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (64,'deepak','deepak@gmail.com','307368082Tulips.jpg','password','2017-08-03 12:34:35','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (65,'Radhika Raju','radhika.r@m-tutor.com',NULL,'radhika','2017-08-03 12:34:55','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (67,'dddd ieru','ddd@231dkd.com',NULL,'ansdfkj','2017-08-04 11:32:35','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (68,'erereqbhg','sdfol1@skdf234.com',NULL,'sadfkjakie','2017-08-04 11:33:59','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (69,'Sowmiya','sowmiya.r@m-tutor.com','685632552light_pink_roses-wallpaper-1366x768.jpg','sowmiya123','2017-08-08 16:48:40','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (70,'Sowmiya','sowmiya.r@mailinator.com','1038531266Penguins.jpg','sowmiya123','2017-08-08 17:13:44','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (71,'Manohar','manoharrpm20@gmail.com','292276803mano_passport_photo_360.jpg','rpmmano@1980','2017-08-08 17:41:09','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (72,'Test','test1@mailinator.com',NULL,'password','2017-08-08 17:50:37','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (73,'Test','test636@mailinator.com',NULL,'test636','2017-08-09 10:20:50','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (74,'t','t@mailinator.com',NULL,'muthu','2017-08-09 11:08:41','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (75,'Abdul Shakir Abdul Shakir Abdu','test637@mailinator.com',NULL,'test637','2017-08-09 13:05:53','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (76,'Sowmiya','sowmiya.r123@mailinator.com',NULL,'sowmiya123','2017-08-11 15:08:01','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (77,'Masthan','masthan@mailinator.com',NULL,'test1234','2017-08-11 15:23:39','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (78,'Masthan','masthan12@mailinator.com',NULL,'test1234','2017-08-11 15:25:40','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (80,'Sowmiya','sowmiya1234@mailinator.com','1478565342E2-4305P_600x600.jpg','sowmiya1234','2017-08-11 15:44:33','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (81,'murugan','murugan@gmail.com',NULL,'murugan','2017-08-14 15:25:28','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (82,'Radhika R','radhikaraju.n@gmail.com','740389650Tune of Love, 30X30 inch Acrylic.jpg','rvrto481','2017-08-16 11:50:27','active');
insert  into `users`(`id`,`name`,`emailid`,`profileImage`,`password`,`createdOn`,`status`) values (83,'Masthan','hello55@mailinator.com',NULL,'test1234','2017-08-22 16:38:46','active');

/*Table structure for table `wishlist` */

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `wishlist` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
