// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.contactcenterinsights.v1;

// [START contactcenterinsights_v1_contactcenterinsights_qaquestion_create]
import com.google.cloud.contactcenterinsights.v1.ContactCenterInsightsClient;
import com.google.cloud.contactcenterinsights.v1.CreateQaQuestionRequest;
import com.google.cloud.contactcenterinsights.v1.QaQuestion;

public class CreateQaQuestion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String qaScorecardId = "example-qa_scorecard_id";
    String revisionId = "example-revision_id";
    String qaQuestionId = "example-qa_question_id";
    createQaQuestion(projectId, locationId, qaScorecardId, revisionId, qaQuestionId);
  }

  public static void createQaQuestion(
      String projectId,
      String locationId,
      String qaScorecardId,
      String revisionId,
      String qaQuestionId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (ContactCenterInsightsClient client = ContactCenterInsightsClient.create()) {
      String parent =
          String.format(
              "projects/%s/locations/%s/qaScorecards/%s/revisions/%s",
              projectId, locationId, qaScorecardId, revisionId);

      QaQuestion.AnswerChoice yesChoice =
          QaQuestion.AnswerChoice.newBuilder()
              .setKey("yes")
              .setBoolValue(true)
              .setScore(1.0)
              .build();

      QaQuestion.AnswerChoice noChoice =
          QaQuestion.AnswerChoice.newBuilder()
              .setKey("no")
              .setBoolValue(false)
              .setScore(0.0)
              .build();

      QaQuestion qaQuestion =
          QaQuestion.newBuilder()
              .setQuestionBody("Did the agent greet the customer?")
              .setAbbreviation("Greeting")
              .setAnswerInstructions(
                  "Check whether the agent greeted the customer at the beginning of the"
                      + " conversation.")
              .addAnswerChoices(yesChoice)
              .addAnswerChoices(noChoice)
              .build();

      CreateQaQuestionRequest request =
          CreateQaQuestionRequest.newBuilder()
              .setParent(parent)
              .setQaQuestionId(qaQuestionId)
              .setQaQuestion(qaQuestion)
              .build();

      QaQuestion response = client.createQaQuestion(request);
      System.out.println("Created QA question: " + response.getName());
    }
  }
}
// [END contactcenterinsights_v1_contactcenterinsights_qaquestion_create]
