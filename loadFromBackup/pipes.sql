--
-- Table structure for table `pipe`
--

DROP TABLE IF EXISTS `pipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `maker` varchar(50) DEFAULT NULL,
  `country` varchar(2) DEFAULT NULL,
  `purchased` date DEFAULT NULL,
  `price` float DEFAULT NULL,
  `target_tobacco` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `note` varchar(50) DEFAULT NULL,
  `active_rotation` char(1) DEFAULT 'Y',
  `sold` date DEFAULT NULL,
  `sold_price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=161 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pipe`
--

LOCK TABLES `pipe` WRITE;
/*!40000 ALTER TABLE `pipe` DISABLE KEYS */;
INSERT INTO `pipe` VALUES (1,'First Pipe','Unknown','IT','2006-08-05',24,'Syrian Latakia/Or (Frog Morton Across The Pond)','','Not sure about the maker, but probably Savinelli',0,NULL,0),(2,'Bjarne Brandy','Bjarna','DK','2006-08-22',50,'Oriental/Perique','','',1,NULL,0),(24,'Grabow Bent Apple','Dr. Grabow','US','2006-09-01',18,'','','',0,'2007-10-13',0),(23,'MM Skinny Cob','Missouri Meerschaum','US','2006-08-30',5,'Anything ','','#690 Legend',0,NULL,0),(22,'MM Bent Cob','Missouri Meerschaum','US','2006-08-25',5,'Anything','','#690 Legend',0,NULL,0),(21,'MM Rounded Cob','Missouri Meerschaum','US','2006-08-25',5,'Anything','','#690 Legend',0,NULL,0),(32,'Grabow Dublin','Dr. Grabow','US','2006-08-31',1,'Anything ','','Stripped finish on 9/8, finished on 9/10\r\n',0,NULL,0),(34,'Grabow Acorn','Dr. Grabow','US','2006-08-31',1,'Aromatic, Heavy, Vanilla','','Stripped finish on 9/17, finished on 9/20\r\n',0,NULL,0),(35,'Grabow Pot','Dr. Grabow','US','2006-08-31',1,'Anything','','Stripped finish on 9/10, finished on 9/16\r\n',0,NULL,0),(36,'Grabow Stripes','Dr. Grabow','US','2006-08-31',1,'Aromatic','','Stripped finish on 11/4, finished on 11/6\r\n',0,'2007-10-13',0),(37,'Grabow Rusticated','Dr. Grabow','US','2006-08-31',1,'','','Restored 9/26-9/28/06, junked on 9/1/14',0,'2014-09-01',0),(38,'Meerschaum','AND','US','2006-09-11',29,'Anything','','',0,NULL,0),(39,'DiMonte Rhodesian','DiMonte','IT','2006-10-06',37,'sell','','',0,NULL,0),(40,'McKinney Freehand','McKinney','US','2006-10-17',170,'Virginia (Astleys No. 109)','Pipe-MikeMcKinny1.JPG','Local Asheville carver\r\n',0,NULL,0),(41,'Boswell Twist','J.M. Boswell','US','2006-11-02',50,'Latakia/Perique','','',0,NULL,0),(42,'Tinsky Smooth Pot','American Smoking Pipe','US','2006-12-27',325,'Virginia','UB510.JPG','',1,NULL,0),(43,'Tinsky Blonde','American Smoking Pipe','US','2007-02-05',185,'Syrian Latakia/Or','BT171.JPG','',0,NULL,0),(44,'Tsuge Bulldog','Tsuge','JP','2007-10-12',110,'Oriental (Classic Samsun)','tsugebulldog.jpg','',0,NULL,0),(45,'Danbark Cutty','Danbark','DK','2008-01-30',120,'VA/KY','2687_large_image.jpg','',0,NULL,0),(46,'Sav Natural Billiard','Savinelli','IT','2008-02-07',33.5,'Oriental','2941_large_image.jpg','',0,NULL,0),(47,'Sav Natural Lovat','Savinelli','IT','2008-02-07',33.5,'Latakia/Oriental/Per','2950_large_image.jpg','',0,NULL,0),(48,'Sav Natural Bulldog','Savinelli','IT','2008-02-07',33.5,'VA/Bur','2947_large_image.jpg','',0,NULL,0),(49,'MM Frenchys Cob','Missouri Meerschaum','US','2008-02-07',0,'Anything','','',0,NULL,0),(61,'GBD Aurochs Billiard','GBD','FR','2008-10-28',21.45,'','AA4783P0272F07.jpg','Shape number 614',0,'2014-08-10',39.99),(54,'GBD Dark Apple','GBD','FR','2008-09-23',54.79,'Burley/KY','AA4783P0173F03.jpg','Shape 1102L',1,NULL,0),(50,'GBD Chubby Apple','GBD','FR','2008-08-16',73.22,'VA/Per (Escudo)','63a4_1_sbl.JPG','Shape 808 with a stinger, paper of authenticity',0,NULL,0),(51,'GBD Dark Dublin','GBD','EN','2008-08-31',38,'Virginia','gbd_virgin_dublin_1.jpg','Shape 864',1,NULL,0),(52,'GBD Light Dublin','GBD','FR','2008-08-30',47,'VA/Bur/KY/Per (Haunted Bookshop)','gbd_ne_dublin_3.jpg','Shape 451 with a stinger, booklet, sheet of auth',0,NULL,0),(53,'GBD Straight Prince','GBD','EN','2008-08-31',51,'Latakia/Oriental','gbd_prince_1.JPG','Shape 357',0,NULL,0),(75,'Comoys Oxford','Comoys','UK','2009-08-03',26.75,'sell','comoy.jpg','',0,'2015-02-08',41),(55,'GBD Dark Prince','GBD','FR','2008-09-23',91,'Oriental','AA4783P00177F02.jpg','Shape 1077B',0,NULL,0),(59,'GBD Dark Billiard 1054','GBD','EN','2008-10-21',27,'Latakia/Oriental','AA4783P0222F06.jpg','Shape 1054 with a stinger, sheet of authenticity',0,NULL,0),(56,'Bjarne Dublin','Bjarne','DK','2008-10-06',80,'Latakia with deer tongue','','Purchased from Teds Pipe Shop, Tulsa',0,NULL,0),(57,'Chacom Monza','Chacom','FR','2008-10-10',125,'VA/Per','','Purchased from Churchills in Topeka.',0,NULL,0),(58,'Brebbia Noce','Brebbia','IT','2008-10-23',24.99,'VA/Bur/KY/Per','','',0,NULL,0),(62,'GBD Aurochs Poker','GBD','FR','2008-10-28',20.5,'','AA4783P0271F02.jpg','Shape number 1444',0,'2014-07-27',33),(63,'GBD Dark Pot 1028','GBD','FR','2008-10-28',34.83,'Latakia/Perique','AA4783P0223F04.jpg','New Era shape number 1028',0,NULL,0),(64,'Chacom Nature','Chacom','FR','2008-10-27',64,'Burley','chacomnature.jpg','',0,NULL,0),(65,'GBD Aurochs Apple','GBD','FR','2008-10-30',19.09,'Oriental/Perique','AA4783P0274F07.jpg','',1,NULL,0),(66,'GBD Dark Billiard 1099','GBD','FR','2008-10-30',29.33,'Syrian Latakia/Or','AA4783P0270F02.jpg','',0,NULL,0),(67,'GBD Aurochs Belge','GBD','FR','2008-10-30',27.95,'Latakia/Oriental/Per','AA4783P0275F02.jpg','',0,NULL,0),(68,'Chacom Festival','Chacom','FR','2008-11-09',28,'Latakia','chacom_festival.jpg','',0,NULL,0),(69,'Brebbia Rocciata','Brebbia','IT','2008-11-10',0,'','brebbia_ROCCIATA.JPG','Cracked shank, returned to seller',0,'2008-11-20',0),(70,'MM Natural Cob','Missouri Meerschaum','US','2008-11-10',5.5,'Anything','naural_cob.jpg','',0,NULL,0),(71,'Brebbia Tapered Billiard','Brebbia','IT','2009-01-06',26.76,'sell','ec8b_1.JPG','',0,NULL,0),(72,'Brebbia Saddle Billiard','Brebbia','IT','2009-01-06',10.5,'Virginia ','brebbia_saddle.jpg','',0,'2015-01-25',22.5),(73,'Brebbia Square Shank','Brebbia','IT','2009-01-06',8.5,'sell','brebbia_panelled.JPG','',0,NULL,0),(74,'Connoisseur','Connoisseur Pipe Shop','US','2009-03-19',18.5,'Syrian Latakia','connoisseur1.JPG','',0,NULL,0),(76,'REE Prince','Richard E. Ellison','US','2009-09-15',100,'VA/Per','','Original owner of Edwards in Englewood, Co',0,NULL,0),(77,'Peterson Kapet','Peterson','IE','2009-09-18',65,'VA/Bur/KY/Per','','Shape 15',0,NULL,0),(78,'Mastercraft Prince','Mastercraft','IT','2010-01-24',15.37,'sell','mastercraft.jpg','was: Syrian Latakia/Or/Per',0,NULL,0),(79,'Sulene Pot','Wilke','US','2010-01-28',12.65,'Cigar/Latakia','wilke.jpg','see sulene.pdf',0,NULL,0),(80,'Royal Ascot De Luxe','Royal Ascot','FR','2010-02-01',13.5,'Cajun Black','royalascotdeluxe.jpg','',0,NULL,0),(81,'Sav Punto Oro','Savinelli','IT','2010-05-04',89,'Latakia/Oriental','','',0,NULL,0),(82,'Sulene Apple','Wilke','US','2010-07-14',13.65,'Aromatic, Mild, Spice','','Opened up airway of stem on 1/23',0,NULL,0),(83,'Whitehall Pot','Whitehall','IT','2010-11-03',9.95,'Cigar','','Draft hole drilled through into the opposite bowl ',1,NULL,0),(84,'LB Billiard','Talbert Pipes','US','2012-09-16',160,'Virginia','lb.jpg','',1,NULL,0),(85,'Mastercraft Pot','Mastercraft','IT','2010-08-15',22.03,'VA/Per','','',0,NULL,0),(86,'Covent Bulldog','Mullins & Westley','UK','2010-08-01',0,'','','Found pipe on Locust street while running, date is',0,NULL,NULL),(87,'Askwith Dublin','Askwith','UK','2012-10-27',275,'Latakia/Oriental/Per (Nightcap)','002-499-0037.jpg','',0,NULL,0),(88,'LB Prince','Talbert Pipes','US','2012-10-28',157,'VA/Per','1290lb.jpg','',0,NULL,0),(89,'SB Paneled Rhodesian','Sebastien Beo','FR','2012-11-09',85,'Burley','002-494-0267.jpg','',0,NULL,0),(90,'LB Lovat','Talbert Pipes','US','2012-12-02',157,'Oriental','12101lb.jpg','',0,NULL,0),(91,'Rad Davis Tomato','Rad Davis','US','2012-12-12',350,'VA/Bur/Per','002-356-0261.jpg','',0,NULL,0),(92,'Medico Acorn','Medico','US','2012-12-11',11.99,'Aromatic, Mild, Fruit','medico.jpg','',0,NULL,0),(93,'Yello Bole Metal ','Yello Bole','US','2012-12-13',35,'','','From 1956 http://www.smokingmetal.co.uk/pipe.php',0,NULL,NULL),(98,'LB Bent Canadian','Talbert Pipes','US','2013-03-21',146.3,'VA/Bur/Per','1314lb01.jpg','',0,NULL,0),(94,'Tinsky Billiard','American Smoking Pipe','US','2012-12-25',166.5,'VA/Bur/Per','','',0,NULL,0),(95,'Herbaugh Lovat','Herbaugh Pipes','US','2013-01-15',275,'Virginia','IMG_3703 1.jpg','',1,NULL,0),(96,'SB Paneled Billiard','Sebastien Beo','FR','2013-01-18',75,'VA/Per','002-494-0365.jpg','',0,NULL,0),(97,'Sasieni Pot','Sasieni','UK','2013-03-21',75,'Latakia/Oriental (Penzance)','','Dated to be post-WWII, pre-1950',0,NULL,0),(99,'Gilbert Egg','Bob Gilbert Pipes','US','2013-06-22',250,'VA/Per','','',0,NULL,0),(100,'Crawford Brandy','Crawford Pipes','US','2013-06-22',275,'Virginia','','',1,NULL,0),(101,'SB Canadian','Sebastien Beo','FR','2013-06-22',80,'Virginia','','',1,NULL,0),(102,'Stanwell Canadian','Stanwell','DK','2013-06-22',50,'Aromatic, Mild, Chocolate and Vanilla','','',0,NULL,0),(103,'Brandt Freehand','Hans Brandt','DK','2013-10-01',90,'VA/Bur/KY','','from Jons Pipe Shop',0,NULL,0),(104,'Jan Harry','Jan Harry Seiffert','DE','2013-10-01',247,'Virginia','','from Jons Pipe Shop',1,NULL,0),(105,'Kaywoodie 500 14','Kaywoodie','US','2012-02-25',3.68,'Aromatic, Heavy, Vanilla','','',0,NULL,0),(106,'LB Nosewarmer','Talbert Pipes','US','2013-12-19',139,'Latakia','','',0,NULL,0),(107,'Tinsky Blast Pot','American Smoking Pipe','US','2014-01-14',195,'VA/Per','sb953_fb.jpg','',0,NULL,0),(108,'LB Paneled Pumpkin','Talbert Pipes','US','2014-01-15',144,'Burley with Cavendish, Oriental, clove, vanilla (','1405lb.jpg','',0,NULL,0),(109,'LB Black Bulldog','Talbert Pipes','US','2014-04-27',144,'VA/Bur/KY','1445lb01.jpg','',0,NULL,0),(110,'Jeantet Chubby','Jeantet','FR','2014-05-09',5,'VA/Bur/Per','','',0,NULL,0),(111,'Natural Bulldog','Unknown','UK','2014-05-09',5,'','','',0,NULL,NULL),(112,'Sasieni Natural Billiard','Sasieni','UK','2014-05-09',5,'Oriental','','Pre-transition, dates from 1950-1979',0,NULL,0),(113,'Charatan Author','Charatan','UK','2014-05-09',5,'','','c. 1961-1981, Authentic possibly Dunhill era',0,'2014-01-04',54.65),(114,'Calabash','Unknown','','2014-05-09',5,'Anything','','',0,NULL,0),(115,'Mock 0380','Don Mock','US','2014-05-09',5,'VA/Per','','',0,NULL,0),(116,'Mock 1083','Don Mock','US','2014-05-09',5,'VA/KY','','',0,NULL,0),(117,'BBB Lovat 183','BBB','UK','2014-05-09',5,'VA/Bur','','1950s-1960s',0,NULL,0),(118,'Castello Old Antiquari','Castello','IT','2014-05-09',5,'Latakia/Oriental','','',0,NULL,0),(119,'Wathen Red Stove','Kerry S. Wathen','US','2014-05-09',5,'','','',0,NULL,NULL),(120,'Morel 438','Pierre Morel','FR','2014-05-09',5,'Oriental','','',0,NULL,0),(121,'Jobey Canadian','Jobey','US','2014-05-09',5,'','','c. 1983',0,NULL,NULL),(122,'Charatan Billiard','Charatan','UK','2014-05-09',5,'Syrian Latakia/Or','','c. 1961-1981, possibly Dunhill era (missing L)',0,NULL,0),(123,'Crawford Acorn','Crawford Pipes','US','2014-06-21',325,'VA/Bur','','',0,NULL,0),(124,'Growley ','Growley Pipes','US','2014-06-21',395,'Burley/KY (Aged Burley Flake)','','',1,NULL,0),(125,'Nording Danish Plateaux ','Nording','DK','2014-05-09',5,'','','Listed on ebay 2014-07-13',0,'2014-07-20',70),(126,'PM Meerschaum 1','Unknown','TZ','2014-05-09',2.5,'','','Sold by JS',0,'2014-06-24',18),(127,'PM Meerschaum 2','SMS','TR','2014-05-09',2.5,'','','Sold by JS on 2014-07-27',0,'2014-07-27',50),(128,'Ascorti Stack Billiard','Ascorti','IT','2014-05-09',5,'','','',0,'2014-08-03',46.55),(138,'Estella Author','Savinelli','IT','2014-05-09',5,'','','',0,'2014-09-07',65.65),(130,'Willmer Straight Grain','Willmer','UK','2014-05-09',5,'','','',0,'2014-08-10',95.25),(131,'Spiral Danish Freehand','Ben Wade','DK','2014-05-09',5,'','','',0,'2014-08-17',80),(132,'Big Ben Jockey','Big Ben','NL','2014-05-09',5,'','','',0,'2014-08-17',76),(133,'Granhill','Michael Kabik','US','2014-05-09',5,'','','',0,'2014-08-17',42.89),(134,'Albertson Meer Lined','Albertson','BE','2014-05-09',5,'Anything','','',0,NULL,0),(135,'Matt Freehand','Ben Wade','DK','2014-05-09',5,'','','',0,'2014-08-31',42),(136,'Unmarked Billiard','Unknown','UK','2014-05-09',5,'','','',0,'2014-08-31',18.5),(137,'Unmarked Freehand','Unknown','DK','2014-05-09',5,'','','',0,'2014-08-31',63),(139,'Celius Fantasy','Celius','DK','2014-05-09',5,'','','',0,'2014-09-07',70),(140,'Danish Sovereign','Stanwell','DK','2014-05-09',5,'','','',0,'2014-09-07',23),(141,'Jobey Billiard','Jobey','US','2014-05-09',5,'','','',0,'2014-09-07',16.5),(142,'Longchamp','Longchamp','FR','2014-05-09',5,'','','',0,'2014-09-14',10.5),(143,'Wathen Tall Billiard','Kerry S. Wathen','US','2014-05-09',5,'','','',0,'2014-09-14',40.23),(144,'Kriswill Acorn','Kriswill','DK','2014-05-09',5,'','','',0,'2014-09-14',41),(145,'SWR Figural','Unknown','IL','2014-05-09',5,'','','',0,'2014-09-14',20.5),(146,'Bubinga Freehand','Unknown','','2014-05-09',5,'','','',0,'2014-09-14',70),(147,'Jobey Canadian','Jobey','US','2014-05-09',5,'','','',0,'2014-10-05',32),(148,'Ascorti Bent Bulldog','Ascorti','IT','2014-05-09',5,'','','',0,'2014-10-05',72),(149,'Monstrosity Corker #9','Olie Sylvester','US','2014-10-30',70,'Syrian Latakia/Or/Per','','',0,NULL,0),(150,'Sasieni Ruff Root','Sasieni','UK','2014-05-09',5,'','','Sold by JS',0,'2013-12-19',66.25),(151,'Mock JS 1','Don Mock','US','2014-05-09',5,'','','Sold by JS',0,'2014-12-19',51.25),(152,'Butz Choquin Pot','Butz Choquin','FR','2014-05-09',5,'Syrian Latakia/Or/Per','','Broke the tenon on 3-29-15',0,'2015-03-29',0),(153,'Preben Holm Crown','Preben Holm','DK','2014-05-09',5,'Latakia/Oriental/Per','','',0,NULL,0),(154,'Sasieni RR Hurlingham','Sasieni','UK','2014-05-09',5,'Oriental/Perique','','',1,NULL,0),(155,'Charatan Canadian','Charatan','UK','2014-05-09',5,'','','',0,NULL,0),(156,'English Apple','Unknown','UK','2014-05-09',5,'Syrian Latakia/Or/Per','','',0,NULL,0),(157,'GBD 1353','GBD','UK','2014-05-09',5,'Cigar/Latakia','','',0,NULL,0),(158,'Davids Apple','Davids Exclusive','US','2014-08-01',5,'Aromatic, Mild, Chocolate and Vanilla','','Date is approx',0,NULL,0),(159,'Savinelli Venere','Savinelli','IT','2015-05-29',0,'Syrian Latakia','','Caption Contest prize',0,NULL,0),(160,'Monstrosity Corker #15','Olie Sylvester','US','2015-09-30',50,'Cigar','','',1,NULL,0);
/*!40000 ALTER TABLE `pipe` ENABLE KEYS */;
UNLOCK TABLES;