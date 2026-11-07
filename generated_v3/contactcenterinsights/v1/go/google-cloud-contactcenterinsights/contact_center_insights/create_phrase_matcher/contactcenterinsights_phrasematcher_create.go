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

// [START contactcenterinsights_v1_contactcenterinsights_phrasematcher_create]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// createPhraseMatcher creates a phrase matcher for Contact Center Insights.
func createPhraseMatcher(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	rule := &contactcenterinsightspb.PhraseMatchRule{
		Query: "thank you for calling",
		Config: &contactcenterinsightspb.PhraseMatchRuleConfig{
			Config: &contactcenterinsightspb.PhraseMatchRuleConfig_ExactMatchConfig{
				ExactMatchConfig: &contactcenterinsightspb.ExactMatchConfig{},
			},
		},
	}

	ruleGroup := &contactcenterinsightspb.PhraseMatchRuleGroup{
		Type:             contactcenterinsightspb.PhraseMatchRuleGroup_ALL_OF,
		PhraseMatchRules: []*contactcenterinsightspb.PhraseMatchRule{rule},
	}

	phraseMatcher := &contactcenterinsightspb.PhraseMatcher{
		DisplayName:           "example-phrase-matcher",
		Type:                  contactcenterinsightspb.PhraseMatcher_ANY_OF,
		Active:                true,
		PhraseMatchRuleGroups: []*contactcenterinsightspb.PhraseMatchRuleGroup{ruleGroup},
	}

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("contactcenterinsights.NewClient: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.CreatePhraseMatcherRequest{
		Parent:        parent,
		PhraseMatcher: phraseMatcher,
	}

	resp, err := client.CreatePhraseMatcher(ctx, req)
	if err != nil {
		return fmt.Errorf("CreatePhraseMatcher: %w", err)
	}

	fmt.Fprintf(w, "Created phrase matcher: %s\n", resp.GetName())
	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_phrasematcher_create]
