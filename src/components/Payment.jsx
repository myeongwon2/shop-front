export const onClickPayment = (pg) => {
  const { IMP } = window;
  IMP.init(`${process.env.REACT_APP_IMP_NUMBER}`);

  const data = {
    pg: pg, // PG사
    pay_method: "card", // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    amount: "100", // 결제금액
    name: "test", // 주문명
    buyer_name: "test", // 구매자 이름
    buyer_tel: "01012345678", // 구매자 전화번호
    buyer_email: "test@naver.com", // 구매자 이메일
    buyer_addr: "test", // 구매자 주소
    buyer_postcode: "test", // 구매자 우편번호
  };
  IMP.request_pay(data, callback);
};

const callback = (response) => {
  const { success, error_msg } = response;
  if (success) {
    window.location.replace("/");
  } else {
    alert(`결제 실패: ${error_msg}`);
  }
};
