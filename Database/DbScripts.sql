USE [SmartBin]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Customer](
	[CustomerID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](150) NOT NULL,
	[LastName] [varchar](150) NOT NULL,
	[Email] [varchar](150) NOT NULL,
	[CreatedDateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Customer] ON
INSERT [dbo].[Customer] ([CustomerID], [FirstName], [LastName], [Email], [CreatedDateTime]) VALUES (1, N'Sujit', N'PV', N'sujithnss@yahoo.com', CAST(0x0000A5C6011205D1 AS DateTime))
INSERT [dbo].[Customer] ([CustomerID], [FirstName], [LastName], [Email], [CreatedDateTime]) VALUES (2, N'Sujit', N'PV', N'sujithnss@yahoo.com', CAST(0x0000A5C80060FC12 AS DateTime))
INSERT [dbo].[Customer] ([CustomerID], [FirstName], [LastName], [Email], [CreatedDateTime]) VALUES (3, N'Ajith', N'PV', N'ajithpvs@yahoo.com', CAST(0x0000A5C90022903F AS DateTime))
SET IDENTITY_INSERT [dbo].[Customer] OFF
/****** Object:  Table [dbo].[SmartBinLog]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SmartBinLog](
	[SmartBinId] [nvarchar](4000) NULL,
	[CustomerId] [int] NOT NULL,
	[Weight] [decimal](18, 0) NOT NULL,
	[UOM] [int] NOT NULL,
	[CreatedDateTime] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TriggerAction]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TriggerAction](
	[Id] [int] NOT NULL,
	[Action] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TriggerAction] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[TriggerAction] ([Id], [Action]) VALUES (1, N'AddToBasket')
INSERT [dbo].[TriggerAction] ([Id], [Action]) VALUES (2, N'SendSMS')
INSERT [dbo].[TriggerAction] ([Id], [Action]) VALUES (3, N'AddToBasketAndSendSMS')
/****** Object:  Table [dbo].[UnitOfMeasure]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UnitOfMeasure](
	[Id] [int] NOT NULL,
	[Unit] [varchar](50) NOT NULL,
 CONSTRAINT [PK_UnitOfMeasure] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[UnitOfMeasure] ([Id], [Unit]) VALUES (1, N'Weight')
INSERT [dbo].[UnitOfMeasure] ([Id], [Unit]) VALUES (2, N'Quantity')
/****** Object:  StoredProcedure [dbo].[TriggerActionGetAll]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:                            <Author,,Name>
-- Create date: <Create Date,,>
-- Description:   <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[TriggerActionGetAll]
                -- Add the parameters for the stored procedure here

AS
BEGIN
                -- SET NOCOUNT ON added to prevent extra result sets from
                -- interfering with SELECT statements.
                SET NOCOUNT ON;

    -- Insert statements for procedure here
                SELECT [Id]
      ,[Action]
  FROM [dbo].[TriggerAction]
END
GO
/****** Object:  Table [dbo].[Product]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Product](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](500) NOT NULL,
	[Image] [varchar](500) NOT NULL,
	[UOM] [int] NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON
INSERT [dbo].[Product] ([Id], [Name], [Image], [UOM]) VALUES (1, N'Rice', N'test', 1)
INSERT [dbo].[Product] ([Id], [Name], [Image], [UOM]) VALUES (2, N'Apple', N'test1', 2)
SET IDENTITY_INSERT [dbo].[Product] OFF
/****** Object:  Table [dbo].[Notification]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notification](
	[CustomerId] [int] NOT NULL,
	[ActionId] [int] NOT NULL,
	[NotificationContent] [nvarchar](2000) NOT NULL
) ON [PRIMARY]
GO
INSERT [dbo].[Notification] ([CustomerId], [ActionId], [NotificationContent]) VALUES (1, 1, N'add to basket content')
/****** Object:  StoredProcedure [dbo].[CustomerInsert]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:                            <Author,,Name>
-- Create date: <Create Date,,>
-- Description:   <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CustomerInsert]
                -- Add the parameters for the stored procedure here
                                                @FirstName varchar(150)
           ,@LastName varchar(150)
           ,@Email varchar(150)
AS
BEGIN
                -- SET NOCOUNT ON added to prevent extra result sets from
                -- interfering with SELECT statements.
                SET NOCOUNT ON;

    -- Insert statements for procedure here
                INSERT INTO [dbo].[Customer]
           ([FirstName]
           ,[LastName]
           ,[Email]
                                   ,[CreatedDateTime]
           )
     VALUES
           (@FirstName
           ,@LastName
           ,@Email
                                                ,GETUTCDATE()
           )
END
GO
/****** Object:  StoredProcedure [dbo].[CustomerGetById]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:                            <Author,,Name>
-- Create date: <Create Date,,>
-- Description:   <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CustomerGetById]
                -- Add the parameters for the stored procedure here
                @CustomerID INT
AS
BEGIN
                -- SET NOCOUNT ON added to prevent extra result sets from
                -- interfering with SELECT statements.
                SET NOCOUNT ON;

    -- Insert statements for procedure here
                SELECT [CustomerID]
      ,[FirstName]
      ,[LastName]
      ,[Email]
      ,[CreatedDateTime]
  FROM [dbo].[Customer] WHERE CustomerID = @CustomerID
END
GO
/****** Object:  Table [dbo].[Basket]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Basket](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[CustomerId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedDateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_Basket] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Basket] ON
INSERT [dbo].[Basket] ([Id], [Name], [CustomerId], [IsActive], [CreatedDateTime]) VALUES (1, N'My Basket', 1, 1, CAST(0x0000A5C601254E79 AS DateTime))
SET IDENTITY_INSERT [dbo].[Basket] OFF
/****** Object:  Table [dbo].[BasketLine]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BasketLine](
	[BasketId] [int] NOT NULL,
	[ProductId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[BasketGet]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[BasketGet]
	-- Add the parameters for the stored procedure here
	@CustomerId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [Id]
      ,[Name]
      ,[CustomerId]
      ,[IsActive]
  
  FROM [dbo].[Basket] WHERE [CustomerId] = @CustomerId
END
GO
/****** Object:  StoredProcedure [dbo].[BasketCreate]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[BasketCreate] 
	-- Add the parameters for the stored procedure here
	@Name varchar(50)
           ,@CustomerId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[Basket]
           ([Name]
           ,[CustomerId]
           ,[IsActive]
           ,[CreatedDateTime])
     VALUES
           (@Name 
           ,@CustomerId  ,1, GETUTCDATE()          
          )
END
GO
/****** Object:  Table [dbo].[SmartBin]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SmartBin](
	[Id] [nvarchar](4000) NULL,
	[ProductId] [int] NOT NULL,
	[ReOrderLevel] [int] NOT NULL,
	[OrderQuantiity] [int] NOT NULL,
	[CustomerId] [int] NOT NULL,
	[TriggerActionId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[ProductGetAll]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:                            <Author,,Name>
-- Create date: <Create Date,,>
-- Description:   <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ProductGetAll]
                -- Add the parameters for the stored procedure here

AS
BEGIN
                -- SET NOCOUNT ON added to prevent extra result sets from
                -- interfering with SELECT statements.
                SET NOCOUNT ON;

    -- Insert statements for procedure here
                SELECT [Id]
      ,[Name]
      ,[Image]
      ,[UOM]
  FROM [dbo].[Product]
END
GO
/****** Object:  StoredProcedure [dbo].[NotificationInsert]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:                            <Author,,Name>
-- Create date: <Create Date,,>
-- Description:   <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[NotificationInsert]
                -- Add the parameters for the stored procedure here
                @CustomerId int
           ,@ActionId int
           ,@NotificationContent nvarchar(2000)
AS
BEGIN
                -- SET NOCOUNT ON added to prevent extra result sets from
                -- interfering with SELECT statements.
                SET NOCOUNT ON;

    -- Insert statements for procedure here
                INSERT INTO [dbo].[Notification]
           ([CustomerId]
           ,[ActionId]
           ,[NotificationContent])
     VALUES
           (@CustomerId
           ,@ActionId
           ,@NotificationContent)
END
GO
/****** Object:  StoredProcedure [dbo].[SmartBinLogInsert]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:                            <Author,,Name>
-- Create date: <Create Date,,>
-- Description:   <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SmartBinLogInsert]
                -- Add the parameters for the stored procedure here
                @SmartBinId NVARCHAR(4000)

           ,@Weight decimal(18,0)
           ,@UOM int
AS
BEGIN
                -- SET NOCOUNT ON added to prevent extra result sets from
                -- interfering with SELECT statements.
                SET NOCOUNT ON;

DECLARE @CustomerId INT

SELECT @CustomerId = CustomerId FROM dbo.SmartBin WHERE Id = @SmartBinId

    -- Insert statements for procedure here
                INSERT INTO [dbo].[SmartBinLog]
           ([SmartBinId]
           ,[CustomerId]
           ,[Weight]
           ,[UOM]
           ,[CreatedDateTime])
     VALUES
           (@SmartBinId
           ,@CustomerId
           ,@Weight
           ,@UOM
           ,GETUTCDATE())
END
GO
/****** Object:  StoredProcedure [dbo].[SmartBinInsert]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:                            <Author,,Name>
-- Create date: <Create Date,,>
-- Description:   <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SmartBinInsert]
                -- Add the parameters for the stored procedure here

                                @Id NVARCHAR(4000),
        @ProductId int,
        @ReOrderLevel int,
        @OrderQuantiity int,
        @CustomerId int,
        @TriggerActionId int
AS
BEGIN
                -- SET NOCOUNT ON added to prevent extra result sets from
                -- interfering with SELECT statements.
                SET NOCOUNT ON;

    -- Insert statements for procedure here
                INSERT INTO [dbo].[SmartBin]
           ([Id]
           ,[ProductId]
           ,[ReOrderLevel]
           ,[OrderQuantiity]
           ,[CustomerId]
           ,[TriggerActionId])
     VALUES
           (@Id
           ,@ProductId
           ,@ReOrderLevel
           ,@OrderQuantiity
           ,@CustomerId
           ,@TriggerActionId)
END
GO
/****** Object:  StoredProcedure [dbo].[SmartBinGetById]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:                            <Author,,Name>
-- Create date: <Create Date,,>
-- Description:   <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SmartBinGetById]
                -- Add the parameters for the stored procedure here
                @Id NVARCHAR(4000)
AS
BEGIN
                -- SET NOCOUNT ON added to prevent extra result sets from
                -- interfering with SELECT statements.
                SET NOCOUNT ON;

    -- Insert statements for procedure here
                SELECT [Id]
      ,[ProductId]
      ,[ReOrderLevel]
      ,[OrderQuantiity]
      ,[CustomerId]
      ,[TriggerActionId]
  FROM [dbo].[SmartBin] WHERE [Id] = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[SmartBinGetAll]    Script Date: 03/23/2016 09:36:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SmartBinGetAll]
	-- Add the parameters for the stored procedure here
	@CustomerId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [Id]
      ,[ProductId]
      ,[ReOrderLevel]
      ,[OrderQuantiity]
      ,[CustomerId]
      ,[TriggerActionId]
  FROM [dbo].[SmartBin]
  WHERE [CustomerId] = @CustomerId
END
GO
/****** Object:  ForeignKey [FK_Product_UnitOfMeasure]    Script Date: 03/23/2016 09:36:24 ******/
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_UnitOfMeasure] FOREIGN KEY([UOM])
REFERENCES [dbo].[UnitOfMeasure] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_UnitOfMeasure]
GO
/****** Object:  ForeignKey [FK_Notification_Customer]    Script Date: 03/23/2016 09:36:24 ******/
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_Customer] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_Customer]
GO
/****** Object:  ForeignKey [FK_Notification_TriggerAction]    Script Date: 03/23/2016 09:36:24 ******/
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_TriggerAction] FOREIGN KEY([ActionId])
REFERENCES [dbo].[TriggerAction] ([Id])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_TriggerAction]
GO
/****** Object:  ForeignKey [FK_Basket_Customer]    Script Date: 03/23/2016 09:36:24 ******/
ALTER TABLE [dbo].[Basket]  WITH CHECK ADD  CONSTRAINT [FK_Basket_Customer] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Basket] CHECK CONSTRAINT [FK_Basket_Customer]
GO
/****** Object:  ForeignKey [FK_BasketLine_Basket]    Script Date: 03/23/2016 09:36:24 ******/
ALTER TABLE [dbo].[BasketLine]  WITH CHECK ADD  CONSTRAINT [FK_BasketLine_Basket] FOREIGN KEY([BasketId])
REFERENCES [dbo].[Basket] ([Id])
GO
ALTER TABLE [dbo].[BasketLine] CHECK CONSTRAINT [FK_BasketLine_Basket]
GO
/****** Object:  ForeignKey [FK_BasketLine_Product]    Script Date: 03/23/2016 09:36:24 ******/
ALTER TABLE [dbo].[BasketLine]  WITH CHECK ADD  CONSTRAINT [FK_BasketLine_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[BasketLine] CHECK CONSTRAINT [FK_BasketLine_Product]
GO
/****** Object:  ForeignKey [FK_SmartBin_Customer]    Script Date: 03/23/2016 09:36:24 ******/
ALTER TABLE [dbo].[SmartBin]  WITH CHECK ADD  CONSTRAINT [FK_SmartBin_Customer] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[SmartBin] CHECK CONSTRAINT [FK_SmartBin_Customer]
GO
/****** Object:  ForeignKey [FK_SmartBin_Product]    Script Date: 03/23/2016 09:36:24 ******/
ALTER TABLE [dbo].[SmartBin]  WITH CHECK ADD  CONSTRAINT [FK_SmartBin_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[SmartBin] CHECK CONSTRAINT [FK_SmartBin_Product]
GO
/****** Object:  ForeignKey [FK_SmartBin_TriggerAction]    Script Date: 03/23/2016 09:36:24 ******/
ALTER TABLE [dbo].[SmartBin]  WITH CHECK ADD  CONSTRAINT [FK_SmartBin_TriggerAction] FOREIGN KEY([TriggerActionId])
REFERENCES [dbo].[TriggerAction] ([Id])
GO
ALTER TABLE [dbo].[SmartBin] CHECK CONSTRAINT [FK_SmartBin_TriggerAction]
GO
