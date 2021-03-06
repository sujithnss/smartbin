USE [SmartBin]
GO
/****** Object:  StoredProcedure [dbo].[SmartBinLogGetById]    Script Date: 03/30/2016 09:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SmartBinLogGetById] 
	-- Add the parameters for the stored procedure here
	@SmartBinId NVARCHAR(4000)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [SmartBinId]
      ,[CustomerId]
      ,[Weight]
      ,[UOM]
      ,[CreatedDateTime]
  FROM [dbo].[SmartBinLog]
  WHERE SmartBinId = @SmartBinId
END
GO
