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

// [START managedkafka_v1_managedkafka_acl_create]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/apiv1"
	"cloud.google.com/go/managedkafka/apiv1/managedkafkapb"
)

// createAcl creates an Access Control List (ACL) entry for an Apache Kafka cluster.
func createAcl(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string, aclID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/clusters/%s", projectID, locationID, clusterID)
	acl := &managedkafkapb.Acl{
		AclEntries: []*managedkafkapb.AclEntry{
			{
				Principal:      "User:*",
				PermissionType: "ALLOW",
				Operation:      "WRITE",
				Host:           "*",
			},
		},
	}

	client, err := managedkafka.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("managedkafka.NewClient: %w", err)
	}
	defer client.Close()

	req := &managedkafkapb.CreateAclRequest{
		Parent: parent,
		AclId:  aclID,
		Acl:    acl,
	}

	response, err := client.CreateAcl(ctx, req)
	if err != nil {
		return fmt.Errorf("client.CreateAcl: %w", err)
	}

	fmt.Fprintf(w, "Created ACL: %s\n", response.GetName())
	return nil
}

// [END managedkafka_v1_managedkafka_acl_create]
