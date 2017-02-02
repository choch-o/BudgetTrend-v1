import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Promises extends React.Component {
  render() {
    const h = this.props.paperHeight;
    const paperStyle = {
      height: {h},
    }
    return (
      <div>
        <Tabs>
          <Tab label="18대">
            <Paper zDepth={1} style={paperStyle}>
              <List>
                <ListItem
                  primaryText="1. 가계부담 덜기"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="신용회복 신청과 승인 시 빚 50% 감면(기초수급자의 경우 70% 감면)"></ListItem>,
                    <ListItem key={2} primaryText="1천만원 한도 내에서 저금리 장기상환 대출로 전환"></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="2. 확실한 국가책임 보육"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="만 5세까지 국가 무상보육 및 무상유아교육"></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="3. 교육비 걱정 덜기"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="고등학교 무상 교육"></ListItem>,
                    <ListItem key={2} primaryText="사교육비 부담 완화"></ListItem>,
                    <ListItem key={3} primaryText="대학등록금 부담 반으로 낮추기(셋째 자녀부터 대학등록금 100% 지원 등)"></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="4. 생애주기별 맞춤형 복지정책 확실하게 추진"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="암, 심혈관, 뇌혈관, 희귀난치성 4대 중증질환의 경우 건강보험이 100% 책임"></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="5. 창조경제를 통해 새로운 시장과 새로운 일자리 늘리기"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="IT, 문화, 컨텐츠, 서비스 산업에 대한 투자 대폭 확대"></ListItem>,
                    <ListItem key={2} primaryText="스펙초월시스템 마련"></ListItem>,
                    <ListItem key={3} primaryText="청년들의 해외취업 확대"></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="6. 근로자의 일자리 지키기"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="60세로 정년 연장"></ListItem>,
                    <ListItem key={2} primaryText="해고 요건 강화"></ListItem>,
                    <ListItem key={3} primaryText="일방적인 구조조정이나 정리해고 방지를 위해 사회적인 대타협기구 설립"></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="7. 근로자의 삶의 질 올리기"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="장시간 근로 관행 개혁"></ListItem>,
                    <ListItem key={2} primaryText="공공부문부터 비정규직 근로자 정규직 전환"></ListItem>,
                    <ListItem key={3} primaryText="비정규직 차별 회사에 대한 징벌적 금전보상제도 적용"></ListItem>,
                    <ListItem key={4} primaryText="사회보험 국가지원 확대"></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="8. 국민안심프로젝트 추진"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="성폭력, 학교폭력, 가정파괴범, 불량식품 등 4대 사회악 뿌리뽑기"></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="9. 대기업과 중소기업 상생의 경제민주화">
                </ListItem>
                <ListItem
                  primaryText="10. 지역균형발전과 대탕평 인사">
                </ListItem>
              </List>
            </Paper>
          </Tab>
          <Tab label="17대">
            <Paper zDepth={1}>
              <List>
                <ListItem
                  primaryText="1. 7% 성장, 300만개 일자리"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="규제완화, 감세, 법질서 확립, 공공개혁으로 세계최고기업환경을 만들고, 과학기술투자를 GDP 5%로 확대하여 신성장동력을 확보함으로써 7% 성장을 달성하고 300만개 새 일자리를 창출하겠습니다."></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="2. 공교육 두배, 사교육비 절반"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="고교다양화 300, 영어공교육 완성, 대학입시 3단계 자율화, 대학관치 완전철폐, 맞춤형 국가장학제도 구축 등을 통해 공교육을 정상화하고 글로벌 경쟁력을 갖춘 인재를 양성하겠습니다."></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="3. 국가책임 영·유아 보·교육실시"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="임신-출산-보육-취학의 4단계에 걸쳐 의료비, 보육비, 교육비를 국가가 책임짐으로써 소중한 내 아이를 잘 기를 수 있는 행복한 가정을 반드시 이루어내겠습니다."></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="4. 한반도대운하로 열리는 한 물길 한 마음"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="한강, 낙동강, 금강, 영산강을 한 물길로 연결하여 환경 개선, 수자원의 효율적 관리, 재해 예방, 물류 혁신, 지역경제 발전 등을 이룩하고, 아름답고 살고싶은 국토로 재창조하겠습니다."></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="5. 비핵·개방·3000을 통한 평화로운 한반도"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="국익에 기초한 실용외교를 통해 국제적 위상을 높이고, 북한의 핵 폐기와 개혁·개방을 유도하는 전략적 대북정책을 추진함으로써 평화통일의 기반을 완비해 나가겠습니다."></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="6. 아자아자! 중소기업, 으샤으샤! 자영업자"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="중소기업과 자영업은 우리 경제의 동력이요 일하는 복지의 핵심입니다. 금융·세제 지원, 제도 간소화 등을 통해 중소기업이 성공의 기회가 되는 사회를 만들겠습니다."></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="7. 과학기술과 문화, 소프트파워가 강한 나라"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="IT, BT, NT, CT, 로봇 등 첨단 과학기술을 육성하고, 문화와 예술, 스포츠, 관광을 진흥하여 소프트파워가 강한 나라를 만들겠습니다."></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="8. 서민 주요생활비 30% 절감"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="불합리한 유통구조와 가격체계, 지나친 정부개입 등 제도 혁신을 통해 주요생활비를 30% 경감하여 국민의 가계부담을 덜어드리고, 중산층이 두터운 나라를 만들겠습니다."></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="9. 연간50만호, 신혼부부 보금자리 주택 12만호 공급"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="서민 주거권을 국민 기본권 차원으로 보호하겠습니다. 신혼부부 보금자리 주택을 연 12만호 공급하고 수요자 중심의 계획적인 주택공급을 통해 연간 50만호의 주택을 공급하겠습니다."></ListItem>
                    ]}>
                </ListItem>
                <ListItem
                  primaryText="10. 일 잘하는 실용정부 구현"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="법과 질서를 세우고 국가경영시스템을 시대에 맞게 재설계함으로써 국민을 위해 더 많은 서비스를 하는 도우미 정부, 경제를 살리고 세금을 아끼는 유능한 실용정부를 만들겠습니다."></ListItem>
                    ]}>
                </ListItem>
              </List>
            </Paper>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Promises;
