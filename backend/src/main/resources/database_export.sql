-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: expensetracker
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `budget`
--

DROP TABLE IF EXISTS `budget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget` (
  `budget_id` bigint NOT NULL,
  `amount` double NOT NULL,
  `month` int NOT NULL,
  `user_id` bigint NOT NULL,
  `year` bigint NOT NULL,
  PRIMARY KEY (`budget_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget`
--

LOCK TABLES `budget` WRITE;
/*!40000 ALTER TABLE `budget` DISABLE KEYS */;
INSERT INTO `budget` VALUES (1,30000,11,2,2024),(2,3000,12,2,2024);
/*!40000 ALTER TABLE `budget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_seq`
--

DROP TABLE IF EXISTS `budget_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_seq`
--

LOCK TABLES `budget_seq` WRITE;
/*!40000 ALTER TABLE `budget_seq` DISABLE KEYS */;
INSERT INTO `budget_seq` VALUES (101);
/*!40000 ALTER TABLE `budget_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `transaction_type_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `FKnsbgi05kd9jtu7k9ted8x93s1` (`transaction_type_id`),
  CONSTRAINT `FKnsbgi05kd9jtu7k9ted8x93s1` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_type` (`transaction_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Groceries',_binary '',1),(2,'Salary',_binary '',2),(3,'Utilities',_binary '',1),(4,'Freelance',_binary '',2),(5,'Investments',_binary '',2),(6,'Gifts',_binary '',2),(7,'Entertainment',_binary '',1),(8,'Transportation',_binary '',1),(9,'Healthcare',_binary '',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` enum('ROLE_USER','ROLE_ADMIN') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_USER'),(2,'ROLE_ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_transaction`
--

DROP TABLE IF EXISTS `saved_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_transaction` (
  `plan_id` bigint NOT NULL,
  `amount` double NOT NULL,
  `category_id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `frequency` enum('ONE_TIME','DAILY','MONTHLY') DEFAULT NULL,
  `transaction_type_id` int NOT NULL,
  `upcoming_date` date DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_transaction`
--

LOCK TABLES `saved_transaction` WRITE;
/*!40000 ALTER TABLE `saved_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `saved_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_transaction_seq`
--

DROP TABLE IF EXISTS `saved_transaction_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_transaction_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_transaction_seq`
--

LOCK TABLES `saved_transaction_seq` WRITE;
/*!40000 ALTER TABLE `saved_transaction_seq` DISABLE KEYS */;
INSERT INTO `saved_transaction_seq` VALUES (51);
/*!40000 ALTER TABLE `saved_transaction_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transaction_id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `FKgik7ruym8r1n4xngrclc6kiih` (`category_id`),
  KEY `FKanjpo5tiapru7an6cw4cu37y4` (`user_id`),
  CONSTRAINT `FKanjpo5tiapru7an6cw4cu37y4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKgik7ruym8r1n4xngrclc6kiih` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (4,150,'2024-10-02','Supermarket shopping',1,2),(5,100,'2024-10-15','Birthday gift',6,2),(6,500,'2024-10-01','Website design',4,2),(7,300,'2024-10-01','Monthly paycheck',2,2),(8,200,'2024-10-10','Stock dividends',5,2),(9,700,'2024-10-20','Consulting project',4,2),(12,100,'2024-10-03','Electricity bill',3,2),(13,150,'2024-10-06','Movie tickets',7,2),(14,120,'2024-12-11','Doctor visit',9,2),(15,130,'2024-10-12','Weekly groceries',1,2),(16,250,'2024-10-22','Organic market',1,2),(17,70,'2024-10-18','Bus pass',8,2),(18,3000,'2024-11-01','Monthly paycheck',2,2),(19,600,'2024-11-05','Graphic design',4,2),(20,200,'2024-11-09','Mutual fund',5,2),(21,160,'2024-11-02','Supermarket shopping',1,2),(22,105,'2024-11-11','Gas bill',8,2),(23,85,'2024-11-06','Theater tickets',7,2),(24,125,'2024-11-09','Eye exam',9,2),(25,65,'2024-11-12','Museum entry',7,2),(26,175,'2024-11-13','Car maintenance',8,2),(27,134,'2024-11-23','Farmers market',1,2),(28,72,'2024-11-27','Bowling night',7,2),(29,3000,'2024-12-01','Monthly paycheck',2,2),(30,550,'2024-12-03','Content writing',4,2),(31,245,'2024-12-25','Savings interest',5,2),(32,170,'2024-12-02','Supermarket shopping',1,2),(33,110,'2024-12-05','Electricity bill',3,2),(34,90,'2024-12-09','Concert tickets',7,2),(35,55,'2024-12-12','Gasoline',8,2),(36,135,'2024-12-14','Doctor visit',9,2),(37,75,'2024-12-14','Restaurant outing',7,2),(38,120,'2024-12-09','Internet bill',3,2);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_type`
--

DROP TABLE IF EXISTS `transaction_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_type` (
  `transaction_type_id` int NOT NULL AUTO_INCREMENT,
  `transaction_type_name` enum('TYPE_EXPENSE','TYPE_INCOME') DEFAULT NULL,
  PRIMARY KEY (`transaction_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_type`
--

LOCK TABLES `transaction_type` WRITE;
/*!40000 ALTER TABLE `transaction_type` DISABLE KEYS */;
INSERT INTO `transaction_type` VALUES (1,'TYPE_EXPENSE'),(2,'TYPE_INCOME');
/*!40000 ALTER TABLE `transaction_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (2,1),(1,2);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_img_url` varchar(255) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `verification_code` varchar(64) DEFAULT NULL,
  `verification_code_expiry_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com',_binary '','testing1234',NULL,'admin_test','123456','2024-10-30 00:00:00.000000'),(2,'user@gmail.com',_binary '','testing1234',NULL,'user_test','61837','2024-11-13 14:57:17.763000');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09  7:44:16
