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

package main

// [START contactcenterinsights_v1_contactcenterinsights_qaquestion_create]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
	"google.golang.org/protobuf/proto"
)

// createQaQuestion creates a QA question under a QA scorecard revision.
func createQaQuestion(ctx context.Context, w io.Writer, projectID string, locationID string, qaScorecardID string, revisionID string, qaQuestionID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/qaScorecards/%s/revisions/%s", projectID, locationID, qaScorecardID, revisionID)
	qaQuestion := &contactcenterinsightspb.QaQuestion{
		QuestionBody:       "Did the agent greet the customer?",
		Abbreviation:       "greeting",
		AnswerInstructions: "Verify if the agent used an approved greeting.",
		Order:              1,
		AnswerChoices: []*contactcenterinsightspb.QaQuestion_AnswerChoice{
			{
				Key:   "yes",
				Score: proto.Float64(1.0),
				Value: &contactcenterinsightspb.QaQuestion_AnswerChoice_BoolValue{
					BoolValue: true,
				},
			},
			{
				Key:   "no",
				Score: proto.Float64(0.0),
				Value: &contactcenterinsightspb.QaQuestion_AnswerChoice_BoolValue{
					BoolValue: false,
				},
			},
		},
	}

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.CreateQaQuestionRequest{
		Parent:       parent,
		QaQuestionId: qaQuestionID,
		QaQuestion:   qaQuestion,
	}

	resp, err := client.CreateQaQuestion(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateQaQuestion failed: %w", err)
	}

	fmt.Fprintf(w, "Created QA question: %s\n", resp.GetName())
	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_qaquestion_create]
