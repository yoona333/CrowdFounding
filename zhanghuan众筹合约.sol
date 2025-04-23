// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//定义了一个众筹合约
contract zhanghuan_Crowd {
    // ============================================铸造代币============================================

    uint256 public zhanghuan_totalSupply; //定义了代币总量

    constructor(uint256 _zhanghuan_totalSupply) {
        //构造函数在部署合约时只会被调用一次。
        zhanghuan_mint(_zhanghuan_totalSupply); //铸币
        zhanghuan_owner = msg.sender;
    }

    mapping(address => uint256) public zhanghuan_balanceOf; //地址与金额映射
    uint8 public zhanghuan_decimals = 18; //定义容量

    //转账方法 通过传入发送者地址、接收者地址、以及金额
    function zhanghuan_transferFrom(
        address zhanghuan_sender,
        address zhanghuan_recipient,
        uint256 zhanghuan_amount
    ) public returns (bool) {
        zhanghuan_balanceOf[zhanghuan_sender] -= zhanghuan_amount; //调用mapping，发送方的地址所对应的金额减去转出的金额
        zhanghuan_balanceOf[zhanghuan_recipient] += zhanghuan_amount; //调用mapping，接收方的地址所对应的金额加上接收到的金额
        return true;
    }

    //铸造代币 给合约调用者增加代币
    function zhanghuan_mint(uint256 _zhanghuan_amount) public {
        zhanghuan_balanceOf[msg.sender] += _zhanghuan_amount; //更新金额
        zhanghuan_totalSupply += _zhanghuan_amount; //将总金额加上所新铸造的
    }

    // ============================================创建众筹项目============================================

    //创建众筹合约的结构体
    struct zhanghuan_Project {
        //合约结构体
        string zhanghuan_title; //标题
        string zhanghuan_content; //内容
        uint256 zhanghuan_targetAmount; //目标金额
        uint256 zhanghuan_currentAmount; //当前金额
        uint256 zhanghuan_startTime; //开始时间
        uint256 zhanghuan_endTime; //结束时间
        uint256 zhanghuan_supportersCount; //参与人数
        address zhanghuan_nowaddress; //当前合约地址
        //  mapping(address => uint256) contributionTimes; //用于存储每个捐款者的众筹时间    //结束时间
    }

    address public zhanghuan_owner; //创建众筹项目的人的地址
    mapping(address => mapping(uint256 => uint256)) public zhanghuan_balances; //mapping嵌套 通过地址和所捐赠的项目id 来查找所捐赠的钱
    // 触发事件（项目的地址，项目的ID，捐款的金额）
    event zhanghuan_Donation(
        address indexed zhanghuan_donor,
        uint256 indexed zhanghuan_projectId,
        uint256 zhanghuan_amount
    );
    event zhanghuan_create(
        string zhanghuan_title,
        string zhanghuan_content,
        uint256 zhanghuan_targetAmount,
        uint256 zhanghuan_startTime,
        uint256 zhanghuan_endTime
    );
    //迭代映射
    // mapping (address => uint)  zhanghuan_balance;    //捐赠者地址 映射 捐赠金额  为了查询该账户是否捐款 捐款了的金额
    // mapping (address => uint)  zhanghuan_projectid;    // 捐赠者地址 映射 捐赠项目编号
    // mapping (address => zhanghuan_Project) zhanghuan_projects;  //通过地址来映射是哪个合约
    // address[] public zhanghuan_donators;          //定义一个地址类型的数组

    uint256 public zhanghuan_ProjectCount; //一共有几个合约
    zhanghuan_Project[] public zhanghuan_Projects; //将每个合约放入结构体类型的数组里

    //创建合约项目 通过传入标题、内容、目标金额、开始时间、结束时间
    function zhanghuan_createProject(
        string memory _zhanghuan_title,
        string memory _zhanghuan_content,
        uint256 _zhanghuan_targetAmount,
        uint256 _zhanghuan_stratTime,
        uint256 _zhanghuan_endTime
    ) public {
        zhanghuan_Project memory newProject = zhanghuan_Project( //初始化结构体
            _zhanghuan_title,
            _zhanghuan_content,
            _zhanghuan_targetAmount,
            0,
            _zhanghuan_stratTime,
            _zhanghuan_endTime,
            0,
            address(this)
        );
        zhanghuan_Projects.push(newProject); //初始化完成之后，将这个合约项目加入到 众筹项目结构体数组中
        zhanghuan_ProjectCount++; //把众筹合约项目数量加1
        emit zhanghuan_create(
            _zhanghuan_title,
            _zhanghuan_content,
            _zhanghuan_targetAmount,
            _zhanghuan_stratTime,
            _zhanghuan_endTime
        );
    }

    //发起捐款方法
    function zhanghuan_donate(
        //传入项目id以及金额 来捐款
        uint256 _zhanghuan_id,
        uint256 _zhanghuan_donateamount
    ) public payable {
        //这里是payable 可支付的方法
        require(_zhanghuan_id < zhanghuan_ProjectCount, "Invalid project ID"); //判断输入的id是否有效
        require( //时间戳的时间要大于等于开始时间
            block.timestamp >=
                zhanghuan_Projects[_zhanghuan_id].zhanghuan_startTime,
            "Not yet started"
        );
        require(
            block.timestamp <= //时间戳要小于等于结束时间
                zhanghuan_Projects[_zhanghuan_id].zhanghuan_endTime,
            "Already ended"
        );
        require(
            _zhanghuan_donateamount > 1, //最小捐款金额至少要大于1
            "The minimum amount of donations is greater than one"
        );

        require(
            zhanghuan_balances[msg.sender][_zhanghuan_id] == 0, // 确保每个人每个项目只能捐赠一次
            "You can donate only once per project"
        );

        //完成以上的判断之后 通过传入的id 访问到对应的众筹项目的结构体数组
        zhanghuan_Project storage zhanghuan_project = zhanghuan_Projects[ // 通过给定的_zhanghuan_id来访问并操作数组中特定的项目
            _zhanghuan_id
        ];
        require( //需要传入的金额加上当前的余额，要小于目标金额
            zhanghuan_project.zhanghuan_currentAmount +
                _zhanghuan_donateamount <=
                zhanghuan_project.zhanghuan_targetAmount,
            "Goal amount reached"
        );

        zhanghuan_transferFrom( //调用转账方法，给众筹项目捐钱  通过传入捐款人地址，当前合约地址，以及捐款金额
            msg.sender,
            address(this),
            _zhanghuan_donateamount
        );
        zhanghuan_mint(1); //奖励捐款者一个代币
        zhanghuan_project.zhanghuan_currentAmount += _zhanghuan_donateamount; //捐款完成后 更新当前该金额
        zhanghuan_project.zhanghuan_supportersCount++; //该项目参与者人数加1
        zhanghuan_balances[msg.sender][_zhanghuan_id] = _zhanghuan_donateamount; //用mapping记录该捐款者的地址、捐款项目的金额

        // 触发捐赠事件（捐赠者，捐赠的项目ID，捐赠的金钱）
        emit zhanghuan_Donation(
            msg.sender,
            _zhanghuan_id,
            _zhanghuan_donateamount
        );
    }

    //返回一共有几个众筹项目
    function zhanghuan_selectProjects_list() public view returns (uint256) {
        return zhanghuan_ProjectCount;
    }

    // 函数用于获取项目的捐款人数和总金额
    function zhanghuan_getProjectDetails(uint256 _projectId)
        external
        view
        returns (uint256, uint256)
    {
        zhanghuan_Project storage zhanghuan_project = zhanghuan_Projects[
            _projectId
        ];
        return (
            zhanghuan_project.zhanghuan_supportersCount,
            zhanghuan_project.zhanghuan_currentAmount
        );
    }

    // 函数，用于向本地址转账任意金额
    function zhanghuan_transferToSelf(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than zero");
        require(
            address(this).balance >= _amount,
            "Insufficient contract balance"
        );
        payable(address(this)).transfer(_amount);
    }

    //将合约的余额提取出来给合约所有者
    function zhanghuan_withdrawBalance() public {
        require(msg.sender == zhanghuan_owner, "Only the owner can withdraw");
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No balance to withdraw");

        payable(zhanghuan_owner).transfer(contractBalance);
    }

    // 通过传入地址和项目id来查看此人是否在此项目捐过款
    function zhanghuan_getBalance(address _addr, uint256 _projectid)
        public
        view
        returns (uint256)
    {
        return zhanghuan_balances[_addr][_projectid]; // 假设内部映射的键为0
    }

    // 允许提取余额的账户列表
    address[] public zhanghuan_withdrawableAccounts;

    // 允许提取余额的账户列表
    mapping(address => bool) public zhanghuan_authorizedWithdrawers;

    // 添加允许提取余额的账户
    function zhanghuan_addWithdrawableAccount(address _zhanghuan_account)
        external
    {
        // 只有合约的拥有者可以添加允许提取余额的账户
        require(
            msg.sender == zhanghuan_owner,
            "Only contract owner can add withdrawable account"
        );
        zhanghuan_withdrawableAccounts.push(_zhanghuan_account);
        zhanghuan_authorizedWithdrawers[_zhanghuan_account] = true;
    }

    // 取消允许提取余额的账户
    function zhanghuan_revokeWithdrawalPermission(address _zhanghuan_account)
        external
    {
        // 只有合约的拥有者可以取消账户的提取权限
        require(
            msg.sender == zhanghuan_owner,
            "Only contract owner can revoke withdrawal permission"
        );

        // 取消账户的提取权限
        zhanghuan_authorizedWithdrawers[_zhanghuan_account] = false;
    }

    // 从合约余额提取到指定账户
    function zhanghuan_withdrawBalance(
        uint256 zhanghuan_projectId,
        uint256 zhanghuan_amount,
        address zhanghuan_withdrawAccount,
        address zhanghuan_caller
    ) external {
        // 检查合约是否已经完成众筹
        require(
            zhanghuan_projectId < zhanghuan_ProjectCount,
            "Invalid project ID"
        );

        require(
            zhanghuan_authorizedWithdrawers[zhanghuan_caller],
            "Account not authorized to withdraw"
        );

        //    只有在提取列表中的账户可以提取余额
        require(
            zhanghuan_authorizedWithdrawers[zhanghuan_withdrawAccount],
            "Account not authorized to withdraw"
        );

        // 检查提取的金额不超过众筹总额
        require(
            zhanghuan_amount <=
                zhanghuan_Projects[zhanghuan_projectId].zhanghuan_currentAmount,
            "Withdraw amount exceeds total amount"
        );

        // 减少众筹合约的余额
        zhanghuan_Projects[zhanghuan_projectId]
            .zhanghuan_currentAmount -= zhanghuan_amount;

        // 更新提取账户的余额
        zhanghuan_balances[zhanghuan_withdrawAccount][
            zhanghuan_projectId
        ] += zhanghuan_amount;
    }
}
