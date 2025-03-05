# 合约部署信息

epoch 为 1000 block 产生一个

XOCMigrate: 0x9AecEbd28FF858148c8ea5e618b81de59ce0D0E0 [用于销毁用户测试网 wxoc]
XOCRelease: 0x6e4Fd5D925C85bC10ff5b04f803118e14750e7de [用于发放主网 xoc]
XOCTeamRelease: 0xCDEE2E0AA54CcAB2E83Fd45B94fD9b2F024cE1e5 [用于团队发放主网 xoc]
TRE: 0xCa16acD438DE143cc82A76a73757c8152e9f7c27 [WXOC 代币]

---- XOCMigrate ----

<!-- 方法中文名：WXOC 迁移主网

方法名：migrate

入参: uint256 amount 迁移数量

返回值：无

触发事件：

event Migrate(
uint256 timestamp, 时间
uint256 amount, 数量
address user, 用户地址
); -->

---- XOCRelease 合约接口 ----

<!-- 方法中文名：释放数据展示信息

方法名：getReleaseInfo

入参: 无

返回值：

struct ReleaseInfo {
uint256 reRelease; 当前释放剩余
uint256 alRelease; 已释放
uint256 maxRelease; 释放的总额度
剩余总量 = convertTotal- alConvert
uint256 nextEpochRelease; 下一个 EPOCH 释放数量
} -->

<!-- 方法中文名：获取 epoch 时间轴数据

方法名：getEpochDetailsInfo

入参: 无

返回值：

struct EpochDetailsInfo {
uint256 totalEpoch; 2 年总共产生 243 EPOCH 带初始释放共计 244 数据
uint256 curlEpoch; 当前处在那个 epoch 为 0 时代表初始释放
EpochInfo[] details; 纪录每个阶段详细数据
}

struct EpochInfo {
uint256 epoch; epoch
uint256 blockNum; 区块
uint256 transactions; 交易笔数
uint256 alRelease; 已经完成释放笔数
uint256 curlRelease; 当期释放数量

} -->

<!-- 方法中文名：WXOC 转换为主网 XOC

方法名：lockAndRelease [服务端接口，前端忽略]

入参:
 address user, 用户地址
uint256 amount, 数量
bytes32 rand 测试网唯一 hash

返回值：无

触发事件：

emit LockAndRelease(
uint256 timestamp, 时间
uint256 lockAmount, 锁仓数量
uint256 releaseAmount, 释放数量
uint256 epoch, 期数
address user, 用户
bytes32 rand 测试网唯一 hash
); -->

<!-- 方法中文名：查询当期可解锁的 XOC

方法名：paddingRelease

入参: address user 用户地址

返回值：

struct UserDetail {
uint256 lockTotal; 用户当前锁仓总量
uint256 releaseTotal; 用户已解锁总量
uint256 peddingReleaseTotal; 当前待解锁总量
} -->

<!-- 方法中文名：提取上方法的 XOC

方法名：release

入参: 无 [如果无当期可领取奖励，请屏蔽该操作]

返回值：无

触发事件：

emit FinishRelease(
uint256 timestamp, 时间
uint256 amount, 数量
uint256 epoch, 期数
address user, 用户
); -->

<!-- ---- XOCTeamRelease ---- [服务端接口]

方法中文名：查询团队能否释放

方法名：paddingReleaseTeam

入参: 无 []

返回值：可释放数量 !=0 即代表可释放调用 releaseTeam 释放团队 XOC

方法中文名：释放团队主网 XOC

方法名：releaseTeam

入参: 无 []

返回值：无

触发事件：

event FinishTeamRelease(
uint256 timestamp, 时间
uint256 amount, 数量
uint256 epoch, 周期
address user, 用户地址
); -->
